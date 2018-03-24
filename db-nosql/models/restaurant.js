const { MongoClient } = require('mongodb');
databaseHost = process.env.DATABASE_HOST || 'localhost';
const url = `mongodb://${databaseHost}/wegot-sidebar`;

const restaurantSchema = {
  place_id: {type: Number, index: true},
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
};
const collectionProperties = {};
for (k in restaurantSchema){
  collectionProperties[k] = {
    k: {
      bsonType: `${restaurantSchema[k]}`
    }
  }
}

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to db!')
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');
    
    db.createCollection('restaurants', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: Object.keys(restaurantSchema),
          properties: collectionProperties
        }
      }
    })
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