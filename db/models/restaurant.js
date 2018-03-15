var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
databaseHost = process.env.DATABASE_HOST || 'localhost';
// var db = mongoose.connect('mongodb://' + databaseHost + '/wegot-sidebar', {
//   useMongoClient: true
// });  previous code
var db = mongoose.connect('mongodb://' + databaseHost + '/wegot-sidebar'); //Andrea Update
mongoose.connection.once('open', () => {
  console.log('Connection to the DB established!!');
});

var restaurantSchema = mongoose.Schema({
  result: {
    place_id: Number,
    name: String,
    formatted_address: String,
    international_phone_number: String,
    website: String,
    url: String,
    open_now: Boolean,
    mondayOpenTime: String,
    mondayCloseTime: String,
    tuesdayOpenTime: String,
    tuesdayCloseTime: String,
    wednesdayOpenTime: String,
    wednesdayCloseTime: String,
    thursdayOpenTime: String,
    thursdayCloseTime: String,
    fridayOpenTime: String,
    fridayCloseTime: String,
    saturdayOpenTime: String,
    saturdayCloseTime: String,
    sundayOpenTime: String,
    sundayCloseTime: String,
    lat: Number,
    lng: Number
  }
});

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

//database functions
exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.count = count;
//misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.connection = db;
