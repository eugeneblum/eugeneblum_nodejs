'use strict';

var express  = require('express');
var router = express.Router();

//Coffee PAGE - GET
router.get('/', function(req, res){
	res.render('coffee');
});

module.exports = router;

