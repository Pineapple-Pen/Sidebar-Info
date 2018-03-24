const newrelic = require('newrelic');
require('dotenv').config();
// change logic to override newrelic LICENSE key and APP NAME with process.env values.

var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '../client/dist'))

app.options((req, res) => {
  res.send('OK');
});

var defaultRestaurantId = Math.floor(Math.random() * 9999);

app.get('/', (req, res) => {
  res.redirect('/restaurants/' + defaultRestaurantId);
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve('client/dist/bundle.js'));
});

app.use('/restaurants', restaurantsRouter);
app.use('/api/restaurants', restaurantsApiRouter);

var port = process.env.PORT;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });

