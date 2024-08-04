const express = require('express')
const { getAllRooms,
    newRoom 
} = require('../controller/roomController')
const router = express.Router()
const requireAuth2 = require('../middleware/requireAuth2')

//get all rooms
router.get('/allrooms',getAllRooms)

//add new room for admin only
router.post('/', requireAuth2('admin'),newRoom)


module.exports = router