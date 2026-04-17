import { useEffect, useState } from 'react'
import axios from 'axios'
import ConfirmModal from '../components/ConfirmModal'
import ImageModal from '../components/imageModal'
import Card from '../components/Card'
import SkeletonCard from '../components/Skeleton'
import LoadingSpinner from '../components/LoadingSpinner/Loading'
import type { Item } from '../components/types/Item'

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
            <Card
              key={item._id}
              item={item}
              onDelete={(id) => {
                setSelectedId(id)
                setShowModal(true)
              }}
              onImageClick={(imageUrl) => {
                setSelectedImage(imageUrl)
                setSelectedId(item._id)
                setShowModalImage(true)
              }}
            />
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
          item={items.find(item => item._id === selectedId) ?? null}
        />
      )}

      <LoadingSpinner />

    </div>
  )
}