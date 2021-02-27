const express = require("express");
const board = express.Router();
const Board = require('../../../models/board')
const result = require('../../../lib/defaultResult');
const Joi = require('@hapi/joi');

board.get('/find', async (req, res) => {
    try{
        if(req.query.board_id){
            Board.findOne({_id: req.query.board_id}, function (err, board) {
                return res.status(200).send(result(true,200,"성공",{ data: board }))
            })
        }else{
            Board.find({}).sort({_id:-1}).exec(function (err,board){
                return res.status(200).send(result(true,200,"성공",{ data: board }))
            });
        }
    }catch(err){
        return res.status(400).send(result(true,500,"통신 에러",err))
    }
});

module.exports = board;