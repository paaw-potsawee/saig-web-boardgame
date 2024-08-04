const express = require('express')
const requireAuth2 = require('../middleware/requireAuth2')
const { reserveroom } = require('../controller/reserveController.js')
const router = express.Router()


router.patch('/:idGame/:idRoom', requireAuth2('user'),reserveroom)

module.exports = router