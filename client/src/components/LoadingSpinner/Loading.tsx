import './LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  )
}