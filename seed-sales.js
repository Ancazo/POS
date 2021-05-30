require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { SalesModel } = require('./models/sales')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let salesData = [
  { salesOrderNumber: 1, customerId: 'customerID-1', productId: 'productID-1', productQuantity: 1, productPrice: 10, totalPrice: 10},
  { salesOrderNumber: 2, customerId: 'customerID-2', productId: 'productID-2', productQuantity: 2, productPrice: 15, totalPrice: 30},
  { salesOrderNumber: 3, customerId: 'customerID-3', productId: 'productID-3', productQuantity: 3, productPrice: 20, totalPrice: 60},
]

salesData = salesData.map(item => {
    item.slug = _.kebabCase(item.salesOrderNumber)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return SalesModel.insertMany(salesData)
    // ProductModel.insertMany(productData)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
      if (connection !== null) {

          
          connection.disconnect()
      }
  })
