const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config()
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true ,minLength:1},
    email: { type: String, required: true, unique: true ,minLength:1},
    passwordHash:{type:String,required:true,minlength:4}
  })
  usersSchema.plugin(uniqueValidator);
  usersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Compress_Image_Users', usersSchema)