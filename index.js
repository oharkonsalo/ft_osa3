const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');const cors = require('cors')
const Person = require('./models/person');

app.use(cors())
app.use(express.static('build'))


app.use(bodyParser.json())
app.use(morgan('tiny'))

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}



let persons = [
      { name: 'Arto Hellas', number: '040-123456', id: 1},
      { name: 'Martti Tienari', number: '040-123456', id: 2},
      { name: 'Arto Järvinen', number: '040-123456', id: 3 },
      { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
   Person
   .find({})
   .then(persons => {
     res.json(persons.map(formatPerson))
   })
  
})

app.get('/info', (req, res) => {

    let date = new Date()
    Person
    .count()
    .then(count => {
      res.send("puhelin luettelossa on "+ count +" henkilön tiedot. <br></br> "+ date +" ")
    })

  })

app.get('/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    })


})
app.delete('/api/persons/:id', (request, response) => {
   
    Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })


  })



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name and/or number missing' })
  }

  const alreadyThere  = persons.find(person => person.name === body.name)
  if (alreadyThere !== undefined) {
    return response.status(400).json({ error: 'name already there' })

  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
 
  person
    .save()
    .then(temp => {
      response.json(temp)
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

