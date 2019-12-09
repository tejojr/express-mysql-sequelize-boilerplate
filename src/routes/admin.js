const express = require('express')
const UnoApi = require('uno-api')

const router = express.Router()
const api = new UnoApi.Router(router, {})
const { wrapperRequest } = require('../helpers/ExpressHelpers')
const UserController = require('../controllers/UserController')

api.create({
    baseURL: '/user',
    get: UserController.getUser,
    getWithParam: [['special', UserController.getUserSpecial]],
    wrapperRequest,
})

module.exports = router
