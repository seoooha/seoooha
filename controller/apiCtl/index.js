const express = require('express');
const api = express.Router();

const board = require('./board');
const comment = require('./comment');

api.use('/board', board);
api.use('/comment', comment);

module.exports = api;