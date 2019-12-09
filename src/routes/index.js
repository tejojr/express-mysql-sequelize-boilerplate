const express = require('express')

const router = express.Router()
const AdminRoute = require('./admin')

router.use('/api/v1', AdminRoute)
module.exports = router
