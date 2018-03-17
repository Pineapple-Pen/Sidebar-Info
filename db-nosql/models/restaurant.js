var postgres = require('pg-promise');
mongoose.Promise = require('bluebird');
databaseHost = process.env.DATABASE_HOST || 'localhost';
// var db = mongoose.connect('mongodb://' + databaseHost + '/wegot-sidebar', {
//   useMongoClient: true
// });  previous code
var db = mongoose.connect('mongodb://' + databaseHost + '/wegot-sidebar'); //Andrea Update
mongoose.connection.once('open', () => {
  console.log('Connection to the DB established!!');
});

var restaurantSchema = ;

var Restaurant = mongoose.model('Restaurant', restaurantSchema);


var find = (queryObj) => {
  return Restaurant.find(queryObj);
};

var insert = (documents) => {
  return Restaurant.create(documents);
};

var remove = (queryObj) => {
  return Restaurant.remove(queryObj);
};

var count = (queryObj) => {
  return Restaurant.count(queryObj);
};

// database functions
exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.count = count;
// misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.connection = db;
