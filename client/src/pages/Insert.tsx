import axios from "axios"
import { useState } from "react"
import Input from "../components/Input"

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

export default function InsertData() {
  const url = 'http://localhost:3001/uploads'
  const [postImage, setPostImage] = useState({ name: '', description: '', price: '', myFile: '' })

  const createImage = async () => {
    try {
      await axios.post(url, {
        name: postImage.name,
        description: postImage.description,
        price: Number(postImage.price),
        image: postImage.myFile
      })
      setPostImage({ name: '', description: '', price: '', myFile: '' })
    } catch (error) {
      console.error('Error creating image:', error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createImage()
  }

  const handleFileUpload = () => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const base64Image = await convertToBase64(file)
      setPostImage({ ...postImage, myFile: base64Image })
    }
  }

  return(
    <form 
    onSubmit={handleSubmit} 
    className='bg-indigo-700 p-4 rounded-lg mt-8 flex flex-col items-center space-y-3 w-96 fixed'>
      <Input
        type='text'
        placeholder='Nome'
        value={postImage.name}
        onChange={(e) => setPostImage({ ...postImage, name: e.target.value })}
      />

      <Input
        type='text'
        placeholder='Descrição'
        value={postImage.description}
        onChange={(e) => setPostImage({ ...postImage, description: e.target.value })}
      />

      <Input
        type='number'
        placeholder='Preço'
        value={postImage.price}
        onChange={(e) => setPostImage({ ...postImage, price: e.target.value })}
      />
      <label htmlFor='file' className='bg-violet-400 px-4 py-2 rounded-md cursor-pointer'>
        Escolher imagem
      </label>
      <input
        type='file'
        id='file'
        accept='.jpeg, .png, .jpg'
        className='hidden'
        name='myFile'
        onChange={handleFileUpload()}
      />
      {postImage.myFile && (
        <img src={postImage.myFile} alt='preview' className='w-32 h-32 object-cover rounded-lg' />
      )}
      <button type='submit' className='bg-violet-600 text-white px-6 py-2 rounded-md w-full'>
        Salvar
      </button>
    </form>
  )
}
