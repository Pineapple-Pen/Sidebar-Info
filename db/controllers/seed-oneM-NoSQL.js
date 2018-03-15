var database = require('../models/restaurant.js');
const {tenThousand, oneMillion} = require('../fake-nosql/generation.js');

const insertion = (data) => {
    database.insert(data)
    .then(
        (response) => {
            database.mongoose.disconnect(); // take this out
            console.log('disconnected');
            console.log('Seeded 10K! Its: ', Date.now());
    })
    .catch((err) => {
        console.error('Failed to seed database');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        database.mongoose.disconnect();
    });
};

const asyncTenThous = async (i) =>{
    console.log(`${i} seeding 10K at: `, Date.now());
    var tenKGenerated = await tenThousand();
    insertion(tenKGenerated)
};

const stackThousandSeeds = async () => {
    for (let i = 0; i < 1000; i += 1) {
        await asyncTenThous(i);
    }
    console.log('Finished stack of a thousand seeds: ', Date.now());
}

stackThousandSeeds();

