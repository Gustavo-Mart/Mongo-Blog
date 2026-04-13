export default function ConfirmModal(
  {
    onClickCancel, 
    onClickConfirm
  } : {
    onClickCancel: () => void, 
    onClickConfirm: () => void
  }
) {
  return(
    <div className="inset-0 bg-black/40 fixed z-50 flex items-center justify-center">
      <div className="bg-indigo-700 p-4 rounded-lg flex flex-col items-center space-y-3 w-96">
        <h1 className="text-xl font-bold text-indigo-50">Deseja mesmo excluir este item?</h1>
        <div className="flex justify-end space-x-2">
          <button onClick={onClickCancel}
            className="py-2 px-6 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition-all" 
          >Cancelar</button>
          <button onClick={onClickConfirm}
          className="py-2 px-6 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition-all"
          >Confirmar</button>
        </div>
      </div>
    </div>
  )
}