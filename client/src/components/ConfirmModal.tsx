import LoadingSpinner from "./LoadingSpinner/Loading"

export default function ConfirmModal(
  {
    onClickCancel,
    onClickConfirm,
    loading
  }: {
    onClickCancel: () => void,
    onClickConfirm: () => void,
    loading?: boolean
  }
) {
  return (
    <div className="inset-0 bg-black/40 fixed z-50 flex items-center justify-center">
      <div className="bg-card p-4 rounded-lg flex flex-col items-center space-y-3 w-96">
        <h1 className="text-xl font-bold text-text-main">Deseja mesmo excluir este item?</h1>
        {loading && <LoadingSpinner />}
        <div className="flex justify-end space-x-2">
          <button onClick={onClickCancel}
            className="py-2 px-6 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-hover transition-all"
          >Cancelar</button>
          <button onClick={onClickConfirm}
            className="py-2 px-6 bg-danger text-white rounded-lg cursor-pointer hover:bg-danger-hover transition-all"
          >Confirmar</button>
        </div>
      </div>
    </div>
  )
}