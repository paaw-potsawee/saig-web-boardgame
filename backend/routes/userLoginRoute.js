const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const requireAuth2 = require('../middleware/requireAuth2')
const {
    signup,
    login,
    history,
    getAllUser,
} = require('../controller/userController')

/**
 * @swagger
 * tags:
 *   name: user
 *   description: users managing API
 */


/**
 * @swagger
 * components:
 *  schemas:
 *      User:   
 *          type: object
 *          required: 
 *              -username     
 *              -password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              roll:
 *                  type: string
 */

/**
* @swagger
*components:
*  schemas:
*    Booking:
*      type: object
*      properties:
*        boardgameName:
*          type: string
*          description: The name of the board game
*        roomName:
*          type: string
*          description: The name of the room
*        reserveDay:
*          type: string
*          format: date
*          description: The day the reservation was made
*        reserveWhen:
*          type: string
*          format: date-time
*          description: The time the reservation was made
 */


/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: create new user
 *      tags: [user]
 *      requestBody:
 *          required: True
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/User'
 *          400:
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          500:
 *              description: internal server error
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: log in user
 *      tags: [user]
 *      requestBody:
 *          required: True
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/User'
 *          401:
 *              description: unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          500:
 *              description: internal server error
 */

/**
 * @swagger
 * /user/history:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: get user history
 *      tags: [user]
 *      responses:
 *          200:
 *              description: get user history
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Booking'
 *          400:
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          500:
 *              description: internal server error
 *                  
 *      
 */

/**
 * @swagger
 * /user/alluser:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: get all username for admin only
 *      tags: [user]
 *      responses:
 *          200:
 *              description: get all users list
 *          400:
 *              description: fail to load users list
 *              content:
 *                  application/json:
 *                      shcema:
 *                          $ref: '#/components/schemas/badrequest'
 *          401:
 *              description: unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/badrequest'
 *          500: 
 *              description: internal server error   
 */
//sign up
router.post('/signup', signup)

//log in
router.post('/login',login)

//user history 
router.get('/history',requireAuth(),history)

//get all user info
router.get('/alluser',requireAuth2('admin'), getAllUser)

module.exports = router