//////////////////////////////
// DEPENDENCIES
////////////////////////////////

require('dotenv').config()

//db connection import occurs after dotenv so module can access process.env object with populated key/value pairs
require('./config/database')

const express = require('express')
const productsRouter = require('./routes/products')

const cors = require('cors')
const morgan = require('morgan')

///////////////////////////////
// APP CONFIG
////////////////////////////////
const { PORT } = process.env

const app = express()

///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// mount express urlencoded - body parser - x-www-urlencoded data (process data from form submission)

app.use(express.urlencoded({extended: true}))
// mount express JSON body parser
app.use(express.json()) // look for a request 'Content-Type' - 'application/json' -> req.body ({...} or [{...}, {...}])
app.use()
// handling CROSS ORIGIN RESOURCE requests - prevents errors on our MERN stack 
app.use(cors())
// mount cors() -> cross origin request middleware
app.use(morgan('dev'))


///////////////////////////////
// ROUTER MIDDELWARE
////////////////////////////////
app.use('/products', productsRouter)

// hello world - test route

app.get('/', (req,res)=>{
    res.send('hello world')
})

///////////////////////////////
// SERVER 
////////////////////////////////

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))
