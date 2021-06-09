const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
},{timestamps: true});

const CustomerModel = mongoose.model('Customers', customerSchema)

module.exports = {
    CustomerModel: CustomerModel
}