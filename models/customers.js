const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
})

const CustomerModel = mongoose.model('Customers', customerSchema)

module.exports = {
    CustomerModel: CustomerModel
}