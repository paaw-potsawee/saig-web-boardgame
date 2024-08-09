const mongoose = require('mongoose');

const Schema = mongoose.Schema


const boardgameSchema = new Schema({
    boardgameName:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    reservation:{
        type:[Date],
    },
})

module.exports = mongoose.model('Boardgame',boardgameSchema)