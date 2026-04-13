export default function ImageModal(
  {imageUrl, onClickCancel}: {imageUrl?: string, onClickCancel: () => void}) {
  return (
    <div className="inset-0 bg-black/40 fixed z-50 flex items-center justify-center select-none"
      onClick={onClickCancel}>
      <div className=" ">
        <div
          className="relative flex  w-2xl flex-col overflow-hidden rounded-lg bg-white bg-clip-border shadow-sm "
          data-dialog-target="image-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            alt="nature"
            className="h-full w-full object-cover object-center select-none"
            src={imageUrl}
          />
            <button className="absolute p-1 top-4 right-4 text-white bg-red-500 hover:bg-red-700 rounded-md" onClick={onClickCancel}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
    </div>
  )
}