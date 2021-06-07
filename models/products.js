const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
//   id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
},{timestamps: true});

const ProductModel = mongoose.model('Products', productSchema)

module.exports = {
  ProductModel: ProductModel
}