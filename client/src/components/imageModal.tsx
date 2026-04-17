import type { Item } from "../components/types/Item"

interface ImageModalProps {
  imageUrl?: string
  onClickCancel: () => void
  item: Item | null
}

export default function ImageModal(
  { imageUrl, onClickCancel, item }: ImageModalProps) {
  return (
    <div className="inset-0 bg-black/60 fixed z-50 flex items-center justify-center select-none"
      onClick={onClickCancel}>
      <div className="px-5 py-10 bg-card" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative flex w-2xl flex-col overflow-hidden rounded-lg bg-card bg-clip-border shadow-sm "
          data-dialog-target="image-modal"
        >
          <img
            alt="nature"
            className="h-full w-full object-cover object-center select-none"
            src={imageUrl}
          />
          <button className="absolute p-1 top-4 right-4 text-white bg-danger hover:bg-danger-hover rounded-md" onClick={onClickCancel}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className=" text-white">
            Nome: <mark className="bg-primary px-1 rounded-md text-white">{item?.name}</mark>
          </p>
          <p className=" text-white">
            Descrição: <mark className="bg-primary px-1 rounded-md text-white">{item?.description}</mark>
          </p>
          <p className=" text-white">
            Preço: <mark className="bg-primary px-1 rounded-md text-white">R$ {item?.price}</mark>
          </p>
        </div>
      </div>
    </div>
  )
}