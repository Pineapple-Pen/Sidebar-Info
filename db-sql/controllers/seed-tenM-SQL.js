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
        .then(() =>  console.log('Finished at: ', Date.now()))
        .catch(err => console.error('error during disconnection', err.stack))
      }
    });
} else {

  let count = 0;
  let start = 0;

  const asyncTenThous = async () => {
    console.log('I am working, human...');
    let generated = tenThousand();
    const text = 'INSERT INTO restaurants(place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);'
    for(let i  = 0; i < generated.length; i += 1) {
      let entry = generated[i];
      // let [a, b, c, d, e, f, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w] = generated[i];
      // await connection.query(`PREPARE fooplan AS INSERT INTO restaurants(place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);
      // `+'EXECUTE fooplan("'+b+'", "'+c+'", "'+d+'", "'+e+'", "'+f+'", '+g+', '+h+', '+j+', '+k+', '+l+', '+m+', '+n+', '+o+', '+p+', '+q+', '+r+', '+s+', '+t+', '+u+', '+v+', "'+w+'");')
      // let text = 'EXECUTE foo'
      await connection.query(text, entry);
    }
  };
  
  const stackOneThousandBatches = async () => {
    let end = 0;
    const oneWorkerShare = 4 / numCPUs; // one worker takes a share of 1k 'batches'
    for (let i = 0; i < oneWorkerShare; i += 1) { // 0 to 250
      await asyncTenThous()
        .then(()=>{
          end = Date.now();
          console.log(`Worker #${process.env.workerId} seeded in ${end - start}ms`);
        }) 
    }
  }
  
  try {
    start = Date.now();
    // asyncTenThous(1);
    stackOneThousandBatches();
  }
  catch (error) {
    count++;
    console.error('error seeding: ', error.stack);
  }
}

// (id, place_name, formatted_address, international_phone_number, email, website, open_now, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, position)