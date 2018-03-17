const pgPromise = require('pg-promise');
const pg = require('pg');
const env = require('dotenv');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const username = process.env.PG_USER;
const password = process.env.PG_PASSWORD;

const connectionString = `postgres://ellisona:bananas@localhost/wegot_sidebar`;
const client = new pg.Client(connectionString);
client.connect()
  .then(() => console.log('connected to postgres'))
  .catch(err => console.error('connection error to postgres: ', err.stack))

// PG connected. Query logic below.
// Note: `npm run sql-db` mustq already have been run, 
// prior to performing any of the following query logic.

// const find = (queryObj) => {
//   client.query(''/* QUERY STRING GOES HERE */'')
//     .then(result => /* do something with result */)
//     .catch(e => console.error('FIND query error, ', e.stack))
//     // .then(() => client.end()) //May not be necessary
// };

// const insertMany = async (entries) => {
//   for (let i = 0; i < entries.length; i++) {
//     let thisEntry = entries[i];
//     await client.query('INSERT INTO restaurants() ')
//       .then(result => /* do something with result */)
//       .catch(e => console.error('FIND query error, ', e.stack))
//     // .then(() => client.end()) //May not be necessary
//   }
// };

// const remove = (queryObj) => {
//   client.query(''/* QUERY STRING GOES HERE */'')
//   .then(result => /* do something with result */)
//   .catch(e => console.error('FIND query error, ', e.stack))
//   // .then(() => client.end()) //May not be necessary
// };

// const count = (queryObj) => {
//   client.query(''/* QUERY STRING GOES HERE */'')
//   .then(result => /* do something with result */)
//   .catch(e => console.error('FIND query error, ', e.stack))
//   // .then(() => client.end()) //May not be necessary
// };

// // database functions, un-promisified
// exports.find = find;
// exports.insertMany = insertMany;
// exports.remove = remove;
// exports.count = count;
// exporting connection
exports.connection = client;
