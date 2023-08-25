require('dotenv').config()

// Load express
const express = require('express')
const cors = require('cors')

// Setup our Express app
const app = express()



const PORT = 8080 

// Load the connectDB function
const connectDB = require('./config')

// Connect to database
connectDB()

// here we require our routes from the folder
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

// here we set up the routes with their controller functions

app.get('/', (req, res) => {res.send('hello')})
app.use('/api/posts', postRoutes)
app.use('/api/users',authorize, userRoutes)
app.use('/auth', authRoutes)

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})