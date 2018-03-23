var {Restaurant} = require('../models/restaurant.js');

module.exports = async (id) => {
  await Restaurant.find({ 'place_id': id })
    .then((result) => {
      console.log('result: ', result[0]);
      return result[0];
    });
};
