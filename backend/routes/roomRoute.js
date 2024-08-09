const express = require('express')
const { getAllRooms,
    newRoom ,
    deleteRoom,
    updateRoom,
} = require('../controller/roomController')
const router = express.Router()
const requireAuth2 = require('../middleware/requireAuth2')

/**
 * @swagger
 * tags:
 *  name: room
 *  description: room managing API 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *     room:
 *      type: object
 *      required:
 *          -roomName
 *      properties:
 *          roomName:
 *              type: string
 *              description: the name of room
 *          reservavtion:
 *              type: array
 *              description: list of reserved time
 *              items:
 *                  type: string
 *                  format: date-time
 *      example:
 *          roomName: A1
 *          reservation: [2024-07-30T15:00:00.000Z]
 */
/**
 * @swagger
 * /room/allRooms:
 *  get:
 *      summary: get all rooms
 *      tags: [room]
 *      responses:
 *          200:
 *              description: get all rooms
 *              content:    
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/room'
 *          400:
 *              description: fail to load rooms
 *              content:
 *                  application/json:
 *                      shcema:
 *                          $ref: '#/components/schemas/badrequest'
 *          500: 
 *              description: internal server error
 */

/**
 * @swagger
 * /room:
 *  post:
 *      summary: post new room fo admin only
 *      security:
 *          - bearerAuth: []
 *      tags: [room]
 *      requestBody:
 *          required: True
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          roomName: 
 *                              type: string
 *      responses:
 *          200:
 *              description: successfully create new room
 *          400:
 *              description: fail create new room
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

/**
 * @swagger
 * /room/{id}:
 *  delete:
 *      summary: delete the room for admin only
 *      tags: [room]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          required: true
 *        description: room's id
 *      responses:
 *          200:
 *              description: successfully delete the room
 *          400:
 *              description: fail to delete room
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

/**
 * @swagger
 * /room/{id}:
 *  patch:
 *      summary: edit existing room
 *      tags: [room]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          required: true
 *        description: room's id
 *      requestBody:
 *          required: True
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          roomName:
 *                              type: string
 *      responses:
 *          200:
 *              description: successfully edit the room
 *          400:
 *              description: fail to edit room
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

//get all rooms
router.get('/allrooms',getAllRooms)

//add new room for admin only
router.post('/', requireAuth2('admin'),newRoom)
router.delete('/:id',requireAuth2('admin'), deleteRoom)
router.patch('/:id',requireAuth2('admin'), updateRoom)


module.exports = router