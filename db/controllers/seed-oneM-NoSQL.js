var database = require('../models/restaurant.js');
const {tenThousand, oneMillion} = require('../fake-nosql/generation.js');

const insertion = (data) => {
  const oneTenth = Math.ceil(data.length/10);
  database.insert(data.slice(0, oneTenth))
    .then(
    //   console.log('1 Seeding stopped at: ', Date.now() )
      database.insert(data.slice(oneTenth, oneTenth * 2))
    ).then(
    //   console.log('2 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 2, oneTenth * 3))
    ).then(
        // console.log('3 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 3, oneTenth * 4))
    ).then(
        // console.log('4 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 4, oneTenth * 5))
    ).then(
        // console.log('5 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 5, oneTenth * 6))
    ).then(
        // console.log('6 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 6, oneTenth * 7))
    ).then(
        // console.log('7 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 7, oneTenth * 8))
    ).then(
        // console.log('8 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 8, oneTenth * 9))
    ).then(
        // console.log('9 Seeding stopped at: ', Date.now() );
      database.insert(data.slice(oneTenth * 9, oneTenth * 10))
    ).then(
      (response) => {
      database.mongoose.disconnect();
      console.log('FULL Seeding stopped at: ', Date.now() );
    })
    .catch((err) => {
      console.error('Failed to seed database');
      console.error('Error Name:', err.name);
      console.error('Error Message:', err.message);
      database.mongoose.disconnect();
    });
  }

tenThousand(insertion);
