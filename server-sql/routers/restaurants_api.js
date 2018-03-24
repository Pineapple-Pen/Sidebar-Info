const express = require('express');
const router = express.Router();
const {findOne} = require('../../db-sql/controllers/getRestaurantById.js');

router.get('/:id/sidebar', (req, res) => {
  var restaurantId = req.params.id;
  findOne(restaurantId).then((restaurant) => {
    console.log('reshaped looks like: ', restaurant);
    res.send(restaurant);
  });
});

module.exports = router;
