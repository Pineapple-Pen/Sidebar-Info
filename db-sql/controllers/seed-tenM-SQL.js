const {connection} = require('../models/restaurant.js');
const pg = require('pg');
const {tenThousand, singlePoint} = require('../fake-sql/generation.js');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // Andrea = 4


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
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
      connection.end()
        .then(() => console.log('connection has ended'))
        .catch(err => console.error('error during disconnection', err.stack))
    }
  });
} else {
  let count = 0;
  const asyncTenThous = async (startPoint) => {
      //console.log(`The ${i} seed of 10K @: `, Date.now());
      let generated = tenThousand(startPoint); // 0 or 250 or 500 or 750
      // let generated = singlePoint(startPoint); 
      for(let i  = 0; i < generated.length; i += 1) {
        const text = 'INSERT INTO restaurants(place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);'
        let entry = generated[i];
        // console.log('this is your entry: ', entry);
        await connection.query(text, entry)
          .catch(e => { 
            count++;
            console.log('error with insertion: ', e.stack);
          })
      }
  };

  // const stackOneThousandBatches = async () => {
  //     console.log('10M seeding started at: ', Date.now())
  //     const oneWorkerShare = 1000 / numCPUs; // one worker takes a share of 1k 'batches'
      
  //     for (let i = 0; i < oneWorkerShare; i += 1) { // 0 to 250
  //       let setNumber = (i*10000)+((10000000/numCPUs)*process.env.workerId); // startpoint in 250 sets of 10k 
  //       await asyncTenThous(setNumber); 
  //     }
  //     console.log('Finished stack of a thousand seeds: ', Date.now());
  //     console.log('errors: ', count);
  // }

  // stackOneThousandBatches();
  asyncTenThous(1);

}

// (id, place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position)