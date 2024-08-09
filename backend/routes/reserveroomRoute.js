const express = require('express')
const requireAuth2 = require('../middleware/requireAuth2')
const { reserveroom } = require('../controller/reserveController.js')
const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: reserve
 *  description: reservation room and boardgame managing API
 */

/**
 * @swagger
 * /reserve/{idGame}/{idRoom}:
 *  patch:
 *      summary: reserve room for user only
 *      tags: [reserve]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: idGame
 *        required: true
 *        schema:
 *          type: string
 *          required: true
 *        description: boardgame's id
 *      - in: path
 *        name: idRoom
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
 *                          reservetime:
 *                              type: string
 *                              format: date-time
 *      responses:
 *          200:
 *              description: successfully reserve
 *          400:
 *              description: fail to reserve 
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

router.patch('/:idGame/:idRoom', requireAuth2('user'),reserveroom)

module.exports = router