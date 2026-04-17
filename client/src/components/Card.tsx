import type { Item } from "../components/types/Item"

interface CardProps {
  item: Item
  onDelete: (id: string) => void
  onImageClick: (imageUrl: string) => void
}

export default function Card({ item, onDelete, onImageClick }: CardProps) {
  return (
    <div key={item._id} className="relative flex flex-col text-text-main bg-card shadow-md bg-clip-border rounded-xl max-w-96">
      <div className="relative grid max-h-88 mx-4 mt-4 overflow-hidden bg-text-secondary/20 bg-clip-border rounded-xl place-items-center">
        <img
          src={item.image}
          alt={item.name}
          onClick={() => onImageClick(item.image)}
          className='w-full h-full object-cover cursor-pointer'
        />
      </div>
      <div className="p-6">
        <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
        <p className='text-base text-text-secondary'>{item.description}</p>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <span className='text-lg font-bold'>R${item.price.toFixed(2)}</span>
        <button
          onClick={() => onDelete(item._id)}
          className='bg-danger hover:bg-danger-hover text-white text-xs font-bold uppercase py-3 px-6 rounded-lg transition-all'
        >
          Remover
        </button>
      </div>
    </div>
  )
}