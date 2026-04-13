import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String, required: true }
})

const itemModel = mongoose.model('Items', itemSchema)

export default itemModel