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

const findOne = (id) => {
  const findRestaurantQuery = new query('SELECT * FROM restaurants WHERE place_id = $1', [id]);
  return db.one(findRestaurantQuery)
  .then(restaurant => {
    let reshaped = {
      result: {
        place_id: restaurant.place_id,
        name: restaurant.place_name,
        formatted_address: restaurant.formatted_address,
        international_phone_number: restaurant.international_phone_number,
        website: restaurant.website,
        url: restaurant.website,
        opening_hours: {
          open_now: restaurant.open_now,
          periods: [
            {
              close: {
                day: 0,
                time: `${restaurant.mon_close - 12}:00PM`
              },
              open: {
                day: 0,
                time: `${restaurant.mon_open}:00AM`
              }
            }, 
            {
              close: {
                day: 1,
                time: `${restaurant.tue_close - 12}:00PM`
              },
              open: {
                day: 1,
                time: `${restaurant.tue_open}:00AM`
              }
            }, 
            {
              close: {
                day: 2,
                time: `${restaurant.wed_close - 12}:00PM`
              },
              open: {
                day: 2,
                time: `${restaurant.wed_open}:00AM`
              }
            }, 
            {
              close: {
                day: 3,
                time: `${restaurant.thu_close - 12}:00PM`
              },
              open: {
                day: 3,
                time: `${restaurant.thu_open}:00AM`
              }
            }, 
            {
              close: {
                day: 4,
                time: `${restaurant.fri_close - 12}:00PM`
              },
              open: {
                day: 4,
                time: `${restaurant.fri_open}:00AM`
              }
            },{
              close: {
                day: 5,
                time: `${restaurant.sat_close - 12}:00PM`
              },
              open: {
                day: 5,
                time: `${restaurant.sat_open}:00AM`
              }
            },{
              close: {
                day: 6,
                time: `${restaurant.sun_close - 12}:00PM`
              },
              open: {
                day: 6,
                time: `${restaurant.sun_open}:00AM`
              }
            }
          ],
          weekday_text: [
            `Monday: ${restaurant.mon_open}:00 AM – ${restaurant.mon_close - 12}:00 PM`,
            `Tuesday: ${restaurant.tue_open}:00 AM – ${restaurant.tue_close - 12}:00 PM`,
            `Wednesday: ${restaurant.wed_open}:00 AM – ${restaurant.wed_close - 12}:00 PM`,
            `Thursday: ${restaurant.thu_open}:00 AM – ${restaurant.thu_close - 12}:00 PM`,
            `Friday: ${restaurant.fri_open}:00 AM – ${restaurant.fri_close - 12}:00 PM`,
            `Saturday: ${restaurant.sat_open}:00 AM – ${restaurant.sat_close - 12}:00 PM`,
            `Sunday: ${restaurant.sun_open}:00 AM – ${restaurant.sun_close - 12}:00 PM`
          ]
        },
        geometry: {
          location: {
            lat: restaurant.position.x,
            lng: restaurant.position.y
          }
        }
      }
    }
    return reshaped
  })
  .catch(error => {
    console.error('Error with find: ', error.stack);   
  });
};

findOne(432);

exports.findOne = findOne;