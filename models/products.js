const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
//   id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = {
  ProductModel: ProductModel
}