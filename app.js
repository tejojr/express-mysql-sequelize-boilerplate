require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is Running in Port :${PORT}`)
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

const route = require('./src/routes/')

app.use(route)
