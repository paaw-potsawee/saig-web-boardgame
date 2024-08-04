const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {
    signup,
    login,
    history
} = require('../controller/userController')

//sign up
router.post('/signup', signup)

//log in
router.post('/login',login)

//user history 
router.get('/history',requireAuth(),history)


module.exports = router