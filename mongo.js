const mongoose = require('mongoose')

const url = 'mongodb://x:x@x'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema);

let nimi = process.argv[2]
let nro = process.argv[3]

if(nimi && nro) {
    const person = new Person({
        name: nimi,
        number: nro
    })
    person
      .save()
      .then(result => {
       console.log(" "+ name +" "+ number+" lisätty")
       mongoose.connection.close()
  })
}

else {

 Person
  .find({})
  .then(result => {
    result.forEach(person => {
      var nametemp = person.name 
      var numtemp = person.number
      console.log(" "+ nametemp +" "+ numtemp +" ")
    })
      mongoose.connection.close()
  })
}

