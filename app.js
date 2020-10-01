require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./src/routes/')

const app = express()
const PORT = process.env.PORT || 3030

app.use(cors())
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(route)
    .listen(PORT, () => {
        console.log(`Server is Running on port : ${PORT}`)
    })
