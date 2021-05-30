const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
//   id: { type: String, required: true },
  customerID: { type: String, required: true },
  productID: { type: String, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
})

const SalesModel = mongoose.model('Sales', salesSchema)

module.exports = {
    SalesModel: SalesModel
}