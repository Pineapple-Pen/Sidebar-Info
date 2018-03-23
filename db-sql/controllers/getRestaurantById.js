const pgp = require('pg-promise')({
  capSQL: true // generate capitalized SQL 
});

const cnParam = {
  host: 'localhost',
  port: 5432,
  database: 'wegot_sidebar',
  user: 'ellisona',
  password: 'bananas'
};

const db = pgp(cnParam);

const query = require('pg-promise').ParameterizedQuery;

// Creating a complete Parameterized Query with parameters:

const findOne = (id) => {
  const findRestaurantQuery = new query('SELECT * FROM restaurants WHERE place_id = $1', [id]);
  return db.one(findRestaurantQuery)
  .then(restaurant => {
      console.log('Found: ', restaurant); // print restaurant object;
  })
  .catch(error => {
    console.error('Error with find: ', error.stack);   
  });
};

findOne(432);


exports.findOne = findOne;