var express = require('express');
var router = express.Router();
var {findOne} = require('../../db-sql/controllers/getRestaurantById.js');

router.use('/:id', express.static('client/dist'));

module.exports = router;
