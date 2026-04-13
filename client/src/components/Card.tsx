import { type Item } from "../pages/Home"

interface CardProps {
  item: Item
  onDelete: (id: string) => void
  onImageClick: (imageUrl: string) => void
}

export default function Card({ item, onDelete, onImageClick }: CardProps) {
  return (
    <div key={item._id} className="relative flex flex-col text-indigo-50 bg-indigo-900 shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative grid h-fit mx-4 mt-4 overflow-hidden bg-indigo-100 bg-clip-border rounded-xl place-items-center">
        <img
          src={item.image}
          alt={item.name}
          onClick={() => onImageClick(item.image)}
          className='w-full h-full object-cover cursor-pointer'
        />
      </div>
      <div className="p-6">
        <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
        <p className='text-base text-indigo-50'>{item.description}</p>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <span className='text-lg font-bold'>R${item.price.toFixed(2)}</span>
        <button
          onClick={() => onDelete(item._id)}
          className='bg-red-500 text-white text-xs font-bold uppercase py-3 px-6 rounded-lg hover:bg-red-600 transition-all'
        >
          Remover
        </button>
      </div>
    </div>
  )
}