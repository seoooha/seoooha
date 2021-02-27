const express = require('express');
const comment = express.Router();
const Board = require('../../../models/board')
const Comment = require('../../../models/comment')
const result = require('../../../lib/defaultResult');
const Joi = require('@hapi/joi');
const { array } = require('@hapi/joi');

comment.get('/find', async (req, res) => {
    try{
        Comment.find({}, function (err, comment) {
            return res.status(200).send(result(true,200,{data: comment }))
        });
    }catch(err){
        return res.status(400).send(result(true,400,"실패",err))
    }
});

// 본인확인
comment.post('/confirm', async (req, res) => {
    try{
        let con = false;
        Board.find({_id : req.body.board_id}, async function (err, board) {
            
            if(err) return res.status(400).send(result(true,400,"보드 실패",err))
            
            new Promise((resolve,reject) =>{
                for(let i=0; i<board[0].comments.length; i++){
                    if((board[0].comments[i]._id == req.body.comment_id) && (board[0].comments[i].password == req.body.password)){
                        con = true
                    }
                }
                resolve(con)
            }).then((confirm_result)=>{
                if(confirm_result) return res.status(200).send(result(true,200,"비밀번호가 일치합니다.",""))

                return res.status(200).send(result(false,400,"비밀번호가 일치하지 않습니다.",""))
            })
        });
    }catch(err){
        return res.status(400).send(result(true,400,"실패",err))
    }
});

// 본인 확인 후 댓글 수정
comment.put('/update', async (req, res) => {
    try{
        new Promise((resolve,reject) =>{
            Board.find({_id : req.body.board_id}).exec(function(err,board){
                if(err) return res.status(200).send(result(true,400,"보드 불러오기 실패",err))
                board[0].comments.forEach(elem => {
                    if(elem._id == req.body.comment_id){
                        elem.comment = req.body.content;
                    } 
                });
                resolve(board[0].comments)
            })
        }).then((value) =>{
            new Promise((resolve,reject) =>{
                Board.updateOne({_id : req.body.board_id},{ $set : { comments : value }}).exec( function(err,data){
                    if(err) return res.status(200).send(result(true,400,"코멘트 수정 실패",err))
                    resolve(data)
                });
            }).then((data) =>{
                return res.status(200).send(result(true,200,"성공", data ))
            })
        })

    }catch(err){
        console.log(err)
        return res.status(400).send(result(true,400,"실패",err))
    }
});


comment.post('/save', async (req, res) => {
    try{
        let comment_sql = new Comment();
        comment_sql.name = req.body.name;
        comment_sql.password = req.body.password;
        comment_sql.comment = req.body.content;
        
        Board.updateOne({_id : req.body.board_id},{ $push : { comments : comment_sql} } ).exec(function(err,board){
            if(err) return res.status(200).send(result(true,400,"보드 실패",err))
            return res.status(200).send(result(true,200,"성공", board ))
        })

    
    }catch(err){
        return res.status(400).send(result(true,400,"실패",err))
    }
});

comment.put('/update', async (req, res) => {
    try{
        return res.status(200).send(result(true,200,"성공","데이터"))
    }catch(err){
        return res.status(400).send(result(true,400,"실패",err))
    }
});

// 댓글 삭제
comment.delete('/remove', async (req, res) => {
    try{
        new Promise((resolve,reject) =>{
            Board.find({_id : req.body.board_id}).exec(function(err,board){
                if(err) return res.status(200).send(result(true,400,"보드 불러오기 실패",err))
                let data = [];
                board[0].comments.forEach(elem => {
                    if(elem._id != req.body.comment_id) {
                        data.push(elem)
                    }
                });
                resolve(data)
            })
        }).then((value) =>{
            new Promise((resolve,reject) =>{
                Board.updateOne({_id : req.body.board_id},{ $set : { comments : value }}).exec( function(err,data){
                    if(err) return res.status(200).send(result(true,400,"코멘트 수정 실패",err))
                    resolve(data)
                });
            }).then((data) =>{
                return res.status(200).send(result(true,200,"성공", data ))
            })
        })

        // Comment.remove({ _id : req.body._id}, (err, data) => {
        //     if(err) return res.status(400).send(result(true,400,"삭제 성공 ",err))
        //     return res.status(200).send(result(true,200,"삭제 성공 ",data))
        // })            
    }catch(err){
        return res.status(400).send(result(true,400,"실패",err))
    }
});

module.exports = comment;