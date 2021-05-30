const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
//   id: { type: String, required: true },
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
})

const CustomerModel = mongoose.model('Customers', customerSchema)

module.exports = {
    CustomerModel: CustomerModel
}