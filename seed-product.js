
require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { ProductModel } = require('./models/products')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let productData = [
  { productId: 1, name: 'product1', price: 10 },
  { productId: 2, name: 'product2', price: 15 },
  { productId: 3, name: 'product3', price: 20 },
]


productData = productData.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return ProductModel.insertMany(productData)
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
