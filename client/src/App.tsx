import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Home from './pages/Home'
import Insert from './pages/Insert'
import './App.css'

export default function App() {
  return (
    <div className='flex flex-col items-center min-h-screen bg-background pt-16'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/insert' element={<Insert />} />
      </Routes>
    </div>
  )
}