const mongoose = require('mongoose')

const url = 'mongodb://x:x@ds229008.mlab.com:29008/kanta'

mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema);

module.exports = Person