// const {db} = require('../models/restaurant.js');
const pg = require('pg');
const pgp = require('pg-promise')({
  capSQL: true // generate capitalized SQL 
});
const {tenThousand} = require('../fake-sql/generation.js');

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'wegot_sidebar',
  user: 'ellisona',
  password: 'bananas'
};

const db = pgp(cn);

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // Andrea = 4

const columnSet = new pgp.helpers.ColumnSet([
  'place_name',
  'formatted_address',
  'international_phone_number',
  'email',
  'website',
  'open_now',
  'mon_open',
  'mon_close',
  'tue_open',
  'tue_close',
  'wed_open',
  'wed_close',
  'thu_open',
  'thu_close',
  'fri_open',
  'fri_close',
  'sat_open',
  'sat_close',
  'sun_open',
  'sun_close',
  'position' 
], {table: 'restaurants'});



if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let startTime = Date.now();
  let endTime = 0;
  let workerCount = 0;

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ workerId : i });
    workerCount++;
  }

  cluster.on('exit', (worker, code, signal) => {
    workerCount--;
    console.log(`worker ${worker.process.pid} died`);
    if(workerCount === 0) {
      pgp.end()
      endTime = Date.now();
      console.log(`Entire process seeded in ${endTime - startTime}ms`)
    }
  });
} else {

  const asyncTenThous = async () => {
    console.log('I am working, human...');
    const generated = tenThousand();
    const insert = pgp.helpers.insert(generated, columnSet);
    await db.none(insert)
      .then(()=>{
        // console.log('10K inserted.');
      })

  };
  
  const stackOneThousandBatches = async () => {
    const oneWorkerShare = 1000 / numCPUs; // one worker takes a share of 1k 'batches'
    for (let i = 0; i < oneWorkerShare; i += 1) { // 0 to 250
      await asyncTenThous()
        .then(()=>{
          console.log(`Worker #${process.env.workerId} now completed ${i + 1} of ${oneWorkerShare} batches`);
        })
    }
  }
  
  try {
    stackOneThousandBatches()
      .then(()=>{
        process.exit(0);
      });
  }
  catch (error) {
    console.error('error seeding: ', error.stack);
  }
}

// (id, place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position)