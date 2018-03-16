const database = require('../models/restaurant.js');
const mongoose = require('mongoose');
const {tenThousand, oneMillion} = require('../fake-nosql/generation.js');

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
      mongoose.disconnect();
      console.log('Disconnected at: ', Date.now());
    }
  });
} else {
   
    const asyncTenThous = async (batch) =>{
        //console.log(`The ${i} seed of 10K @: `, Date.now());
        let tenKGenerated = tenThousand(batch * process.env.workerId); // 0 or 250 or 500 or 750
        await database.Restaurant.insertMany(tenKGenerated);
    };

    const stackOneThousandBatches = async () => {
        console.log('10M seeding started at: ', Date.now())
        const workerSet = 1000 / numCPUs; // one worker takes a share of 1k 'batches'
        for (let i = 0; i < workerSet; i += 1) { // up to 250
            await asyncTenThous(workerSet);
        }
        console.log('Finished stack of a thousand seeds: ', Date.now());
    }

    stackOneThousandBatches();

}

