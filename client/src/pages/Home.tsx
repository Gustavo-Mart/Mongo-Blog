import { useEffect, useState } from 'react'
import axios from 'axios'
import ConfirmModal from '../components/ConfirmModal'
import ImageModal from '../components/imageModal'

interface Item {
  _id: string
  name: string
  description: string
  price: number
  image: string
}

function SkeletonCard() {
  return (
    <div className="relative flex flex-col text-indigo-700 bg-indigo-900 shadow-md bg-clip-border rounded-xl w-96 animate-pulse">
      <div className="relative grid h-56 mx-4 mt-4 overflow-hidden text-indigo-700 bg-indigo-300 bg-clip-border rounded-xl place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
      <div className="p-6">
        <div className="block w-1/3 h-3 mb-4 bg-indigo-300 rounded-full">&nbsp;</div>
        <div className="block w-full h-2 mb-2 bg-indigo-300 rounded-full">&nbsp;</div>
        <div className="block w-2/3 h-2 mb-2 bg-indigo-300 rounded-full">&nbsp;</div>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <button disabled className="h-10 w-20 bg-indigo-300 rounded-lg shadow-none">&nbsp;</button>
        <button disabled className="py-2 px-6 bg-indigo-300 text-indigo-300 rounded-lg shadow-none">remover</button>
      </div>
    </div>
  )
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModalImage, setShowModalImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('http://localhost:3001/count')
      const data = await res.json()
      setCount(data.count)
    }

    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/')
      const data = await res.json()
      setItems(data.items ?? [])
      setLoading(false)
    }

    fetchCount()
    fetchData()
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return
    try {
      await axios.delete(`http://localhost:3001/uploads/${selectedId}`)
      setItems(items.filter(item => item._id !== selectedId))
      setShowModal(false)
      setSelectedId(null)
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <h1 className='text-3xl font-bold mb-6'>Itens</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {loading
          ? Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => (
            <div key={item._id} className="relative flex flex-col text-indigo-50 bg-indigo-900 shadow-md bg-clip-border rounded-xl w-96">
              <div className="relative grid h-56 mx-4 mt-4 overflow-hidden bg-indigo-100 bg-clip-border rounded-xl place-items-center">
                <img 
                src={item.image} 
                alt={item.name} 
                onClick={() => { 
                  setShowModalImage(true) 
                  setSelectedImage(item.image) 
                  }} 
                className='w-full h-full object-cover cursor-pointer' />
              </div>
              <div className="p-6">
                <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
                <p className='text-base text-indigo-50'>{item.description}</p>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center">
                <span className='text-lg font-bold'>R${item.price.toFixed(2)}</span>
                <button
                  onClick={() => {
                    setSelectedId(item._id)
                    setShowModal(true)
                  }}
                  className='bg-red-500 text-white text-xs font-bold uppercase py-3 px-6 rounded-lg hover:bg-red-600 transition-all'
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {showModal && (
        <ConfirmModal
          onClickCancel={() => {
            setShowModal(false)
            setSelectedId(null)
          }}
          onClickConfirm={handleDelete}
        />
      )}

      {showModalImage && (
        <ImageModal
          imageUrl={selectedImage ?? ''}
          onClickCancel={() => {
            setShowModalImage(false)
            setSelectedImage(null)
          }}
        />
      )}
    </div>
  )
}