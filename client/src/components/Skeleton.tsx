export default function SkeletonCard() {
  return (
    <div className="relative flex flex-col text-text-secondary bg-card shadow-md bg-clip-border rounded-xl w-96 animate-pulse">
      <div className="relative grid h-56 mx-4 mt-4 overflow-hidden text-text-secondary bg-primary/30 bg-clip-border rounded-xl place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
      <div className="p-6">
        <div className="block w-1/3 h-3 mb-4 bg-text-secondary/40 rounded-full">&nbsp;</div>
        <div className="block w-full h-2 mb-2 bg-text-secondary/40 rounded-full">&nbsp;</div>
        <div className="block w-2/3 h-2 mb-2 bg-text-secondary/40 rounded-full">&nbsp;</div>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <button disabled className="h-10 w-20 bg-text-secondary/40 rounded-lg shadow-none">&nbsp;</button>
        <button disabled className="py-2 px-6 bg-text-secondary/40 text-text-secondary/40 rounded-lg shadow-none">remover</button>
      </div>
    </div>
  )
}