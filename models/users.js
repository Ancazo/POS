const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
  //   id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  })
  
  const UserModel = mongoose.model('Users', userSchema)
  
  module.exports = {
    UserModel: UserModel
  }