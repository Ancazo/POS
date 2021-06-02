const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
  //   id: { type: String, required: true },
    salesOrderNumber: { type: Number  },
    customerId: { type: String },
    productId: { type: String },
    productQuantity: { type: Number},
    productPrice: { type: Number },
    totalPrice: { type: Number },
  }, {timestamps: true});
  
  const SalesModel = mongoose.model('Sales', salesSchema)
  
  module.exports = {
    SalesModel: SalesModel
  }