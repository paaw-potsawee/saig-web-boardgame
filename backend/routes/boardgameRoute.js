const express = require("express");
const router = express.Router();
const {
  getAllBoardgames,
  getBoardgame,
  newBoardgame,
  updateBoardgame,
  deleteBoardgame,
} = require("../controller/boardgame.js");
const requireAuth2 = require('../middleware/requireAuth2.js')
const requireAuth = require('../middleware/requireAuth.js')
const pagination = require('../middleware/pagination.js')
const Boardgame = require("../models/Boardgames")

/**
 * @swagger
 * components:
 *   schemas:
 *     Boardgame:
 *       type: object
 *       required:
 *         - boardgameName
 *         - price
 *       properties:
 *         boardgameName:
 *           type: string
 *           description: The name of the boardgame
 *         price:
 *           type: number
 *           description: The price of the boardgame
 *         reservation:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: The reservation dates
 *       example:
 *         boardgameName: Chess
 *         price: 10
 *         reservation: [2024-07-30T15:00:00.000Z]
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     BoardgameNamePrice:
 *       type: object
 *       required:
 *         - boardgameName
 *         - price
 *       properties:
 *         boardgameName:
 *           type: string
 *           description: The name of the boardgame
 *         price:
 *           type: number
 *           description: The price of the boardgame
 *       example:
 *         boardgameName: Chess
 *         price: 10
 */

/**
 * @swagger
 * tags:
 *   name: Boardgames
 *   description: The boardgames managing API
 */


/**
 * @swagger
 * /homepage:
 *   get:
 *     summary: Get all boardgames
 *     tags: [Boardgames]
 *     responses:
 *       200:
 *         description: List of boardgames
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Boardgame'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * paths:
 *  /homepage/{id}:
 *    get:
 *      summary: get one boardgame
 *      tags: [Boardgames]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          required: true
 *        description: boardgame's id
 *      responses:
 *        200:
 *          description: get one boardgame
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Boardgame'
 *        401:
 *          description: unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *        404:
 *          description: boardgame not found
 *        500:
 *          description: internal server error
 *    
 */

/**
 * @swagger
 * /homepage:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Boardgames]
 *    summary: add boardgame for admin only
 *    requestBody: 
 *      required: True
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BoardgameNamePrice'
 * 
 *    responses:
 *      200:
 *        description: successfully create new boardgame
 *      400:
 *        description: fail to upload new boardgame
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badrequest'
 *      401:
 *        description: unauthorizes
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badrequest'
 *      500:
 *        description: internal server error
 */

/**
 * @swagger
 * /homepage/{id}:
 *  patch:
 *    security: 
 *      - bearerAuth: []
 *    summary: edit existing boardgame for admin only
 *    tags: [Boardgames]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: True
 *      schema:
 *        type: string
 *      description: boardgame's id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BoardgameNamePrice'
 *    responses:
 *      200:
 *        description: successfully update boardgame
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BoardgameNamePrice'
 *      400:
 *        description: failed to update boardgame 
 *      401:
 *        description: unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badrequest'
 *      500:
 *        description: internal server error
 */

/**
 * @swagger
 * /homepage/{id}:
 *  delete:
 *    summary: delete boardgame for admin only
 *    tags: [Boardgames]
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: id
 *      required: True
 *      schema:
 *        type: string
 *      description:
 *        boardgame's id for deleting
 *    responses:
 *      200:
 *        description:
 *          succesfully deleting boardgamme
 *      401:
 *        description:
 *          unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badrequest'
 *      400:
 *        description:
 *          failed to delete
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badrequest'
 *      500:
 *        description: internal server error
 */
//get all baordgames
router.get("/", pagination(Boardgame), getAllBoardgames);

//get one boardgame
router.get("/:id", requireAuth(),getBoardgame);

//add new boardgame
router.post("/", requireAuth2('admin'),newBoardgame);

//update boardgame
router.patch("/:id", requireAuth2('admin'),updateBoardgame);

//delete boargame
router.delete("/:id", requireAuth2('admin'),deleteBoardgame)
module.exports = router;
