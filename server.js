const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

// Import cors, so REACT app will actually accept requests

const cors = require('cors')

// Import the controller file

const petRouter = require('./controllers/pets.js')



mongoose.connect(process.env.MONGODB_URI) /* Connects to ENV file to grab mongoose link */

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.json())
app.use(cors())
/* You can also pass in arguement of whitelisted domains, so they can access your app */
/* app.use(cors({ origin: 'http://localhost:5173' })) */
/* Either ONE domain, or an array of domains */

// Routes go here
app.use('/pets', petRouter)

app.get('/', (req, res)=> { // request and response arguements
  res.send('Welcome to the Express Pets App')
})



/* IDK why but Ben Manning said to keep the app.listen below everything */

app.listen(3000, () => {
  console.log('The express pets app is ready!')
})


app.get('/*', (req, res)=> {
  res.send({
     error: '404 file not found'
  })
})
