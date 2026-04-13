import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import itemModel from './models/Item.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
connectDB()

app.get('/', async (req, res) => {
  const response = await itemModel.find()
  return res.json({ items: response })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})

app.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await itemModel.create(body)
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" })
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
})

app.delete('/uploads/:id', async (req, res) => {
  try {
    await itemModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Item deletado!' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar item' })
  }
})

app.get('/count', async (req, res) => {
  const count = await itemModel.countDocuments()
  res.json({ count })
})