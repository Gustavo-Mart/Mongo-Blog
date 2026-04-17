export default function Input({ type, className, placeholder, value, onChange }: {
  type: string
  className?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`appearance-none outline-none w-full p-2 rounded-md bg-primary placeholder:text-text-main border-0 ring-2 ring-text-secondary  ${className ?? ''}`}
    />
  )
}