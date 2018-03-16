var models = require('../models');
var express = require('express');
var querystring = require('querystring');

module.exports = {

  defaultHeaders: {
    'access-control-allow-origin': '*',
    'content-type': 'application/json',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key',
    'access-control-max-age': 10 // Seconds.
  },

  messages: {
    get: function (req, res) {
      console.log('THIS GET HAPPENED');
      models.messages.get() 
        .then((objectToSend)=> {
          console.log('this is not inside req.end', objectToSend);
          res.set(module.exports.defaultHeaders);
          res.status(200).end(JSON.stringify(objectToSend));
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // get data
      var msg = '';
      req.on('data', (chunk) => {
        msg += chunk;
      });
      req.on('end', () => {
        msg = querystring.parse(msg);
        models.messages.post(msg);
      });
      res.set(module.exports.defaultHeaders);
      res.status(201).end(JSON.stringify({results: 'fake results'}));
    }, // a function which handles posting a message to the database
    options: function(req, res) {
      res.set(module.exports.defaultHeaders);
      res.status(200).end('sent options back');
    },
    postRespond: function(result) {
      
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

