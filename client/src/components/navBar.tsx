import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-card text-text-main p-4 flex gap-4 fixed w-full top-0 z-10'>
      <Link to='/'>Home</Link>
      <Link to='/insert'>Inserir Item</Link>
    </nav>
  )
}