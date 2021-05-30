const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
  //   id: { type: String, required: true },
    salesOrderNumber: { type: Number, required: true },
    customerId: { type: String, required: true },
    productId: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  })
  
  const SalesModel = mongoose.model('Sales', salesSchema)
  
  module.exports = {
    SalesModel: SalesModel
  }