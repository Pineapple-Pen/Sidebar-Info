var db = require('../db');
var controller = require('../controllers');

module.exports = {
  messages: {
    get: function () { // a function which produces all the messages
      return new Promise( (resolve, reject) => {
        db.query('SELECT * FROM messages, users, rooms WHERE messages.userid = users.id AND messages.roomid = rooms.id ORDER BY -createdat', (err, result) => {
          if (err) { reject(err); }
          //prepackage here? put an message object into the resolve cb
          let objectToSend = {};
          let messagesArray = [];          
          result.forEach((message) => {
            let formattedMessage = {};
            formattedMessage.username = message.username;
            formattedMessage.roomname = message.roomname;
            formattedMessage.objectId = message.id;
            formattedMessage.createdAt = message.createdat;
            formattedMessage.text = message.msgtext;
            //each messages gets pushed into the array,
            messagesArray.push(formattedMessage);
          });  
          //set the new array to a results prop on the object to send to client        
          objectToSend['results'] = messagesArray;
          //perform resolve cb on that object to send to client
          resolve(objectToSend);            
        });
      });
    }, 
    postInsertRooms: function (msg) { // a function which can be used to insert a message into the database
      //when refactoring: 
      //Make rooms more sequential.  Insert into rooms table ONLY WHERE this room is new to the table.
      //query table first for existing rooms that match this msg's roomname.
      return new Promise( (resolve, reject) => {
        db.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', [msg.roomname], function(err, result) {
          if (err) { reject(err); }
          resolve(msg);
        });
      });
    },
    postInsertUsers: function(msg) {
      return new Promise( (resolve, reject) => {
        //when refactoring: 
        //Make users more sequential.  Insert into users table ONLY WHERE this user is new to the table.
        //query table first for existing users that match this msg's username.
        db.query('INSERT IGNORE INTO users (username) VALUES (?)', [msg.username], (err, result) => {
          if (err) { reject(err); }
          resolve(msg);
        });
      });
    },
    getIndexRoom: function (msg) {
      return new Promise( (resolve, reject) => {
        db.query('SELECT id FROM rooms WHERE roomname = ?', [msg.roomname], function(err, result) {
          if (err) { reject(err); }
          resolve(result);
        });
      });
    },
    getIndexUser: function (msg) {
      return new Promise( (resolve, reject) => {
        db.query('SELECT id FROM users WHERE username = ?', [msg.username], function(err, result) {
          if (err) { reject(err); }
          resolve(result);
        });
      });
    },
    postInsertMessages: function(msg, insertArray) {
      return new Promise( (resolve, reject) => {
        db.query('INSERT INTO messages (userid, roomid, createdat, msgtext) VALUES (?, ?, ?, ?)', insertArray, (err, result) => {
          if (err) { console.log('this is the error in postMessages: ', err); }
          resolve(msg);
        });
      });
    }, 
    post: function (msg) { //Posts everything into messages table
      this.postInsertRooms(msg)
        .then( (msg) => {
          return this.postInsertUsers(msg);
        })
        .then( (msg) => {
          return Promise.all([this.getIndexUser(msg), this.getIndexRoom(msg)]);
        })
        .then( (values) => {
          let thisDate = new Date();
          let formattedDate = thisDate.toISOString();
          console.log('formatted date: ', formattedDate, ' of type ', typeof formattedDate);
          formattedDate = formattedDate.slice(0, formattedDate.indexOf('Z')); 
          formattedDate[formattedDate.indexOf('T')] = ' '; 
          this.postInsertMessages(msg, [values[0][0].id, values[1][0].id, formattedDate, msg.text]);
        })
        .catch( (err) => {
          console.log('err: ', err);
        });
    },
  },
  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

