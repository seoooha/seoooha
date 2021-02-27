let express = require('express');
let router = express.Router();
let axios = require('axios');


router.get('/', function(req, res) {
  res.render('index', { title: 'seoooha' });
});

module.exports = router;