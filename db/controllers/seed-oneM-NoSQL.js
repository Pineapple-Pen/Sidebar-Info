const database = require('../models/restaurant.js');
const mongoose = require('mongoose');
const {tenThousand, oneMillion} = require('../fake-nosql/generation.js');

const asyncTenThous = async (i) =>{
    //console.log(`The ${i} seed of 10K @: `, Date.now());
    let tenKGenerated = tenThousand();
    await database.Restaurant.insertMany(tenKGenerated);
};

const stackThousandSeeds = async () => {
    for (let i = 0; i < 1000; i += 1) {
        await asyncTenThous(i);
    }
    console.log('Finished stack of a thousand seeds: ', Date.now());
    mongoose.disconnect();
}

stackThousandSeeds();

