
require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { UserModel } = require('./models/users')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let userData = [
  { name: 'adminAccount1', password: 'adminAccount1' },
]

userData = userData.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return UserModel.insertMany(userData)
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
