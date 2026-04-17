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

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-card p-6 rounded-xl mt-8 flex flex-col items-center space-y-4 w-full max-w-md mx-auto shadow-lg'>
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
      {!postImage.myFile ? (
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-primary/10 border-2 border-dashed border-text-secondary/40 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors">
            <div className="flex flex-col items-center justify-center text-text-secondary pt-5 pb-6">
              <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
              <p className="mb-2 text-sm text-text-main"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload()} accept="image/*" />
          </label>
        </div>
      ) : (
        <div className="relative w-full flex justify-center">
          <img src={postImage.myFile} alt='preview' className='w-full max-h-64 object-cover rounded-xl' />
          <button
            type="button"
            onClick={() => setPostImage({ ...postImage, myFile: '' })}
            className="absolute top-2 right-2 bg-danger hover:bg-danger-hover text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
      )}
      <button type='submit' className='bg-primary text-white px-6 py-2 rounded-lg w-full hover:bg-primary-hover transition-all font-semibold'>
        Salvar
      </button>
    </form>
  )
}
