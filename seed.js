
require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { ProductModel } = require('./models/products')
const { userModel } = require('./models/users')
const { customerModel } = require('./models/customers')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let data = [
    { name: 'Lithops', price: 25 },
]

data = data.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return ProductModel.insertMany(data)
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