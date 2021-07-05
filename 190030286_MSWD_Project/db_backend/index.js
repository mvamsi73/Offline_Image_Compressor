const http = require('http')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

const express=require('express')
var morgan = require('morgan')
const bodyParser = require("body-parser");
const app = express()  

const cors = require('cors')
app.use(cors())

//morgan 

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

const Users=require('./models/users')
app.get('/api/users',(request,response)=>{
  Users.find().then(result=>{
    response.json(result)
  })
})

app.get('/api/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/users', async(request, response,next) => {
  const body = request.body
  if (!body.username || !body.password || !body.email) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new Users({
      username:body.username,
      passwordHash:passwordHash,
      email:body.email,
  })

  user.save().then(res=>{
    response.json(res)
  }).catch(error=>next(error))
})

app.delete('/api/users/:id', (req, res, next) => {
  Users.findByIdAndRemove(req.params.id)
    .then(personToRemove => {
      personToRemove ? res.status(204).end() : res.status(404).end()
    })
    .catch(error => next(error))
})

app.put('/api/users/:id', (req, res, next) => {
  const { username, password } = req.body

  const user = {
    username,
    password
  }

  Users.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/login', async (request, response) => {
    const body = request.body
  
    const user = await Users.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name ,id: user._id})
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})