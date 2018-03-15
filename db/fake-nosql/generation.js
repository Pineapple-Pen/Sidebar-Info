const singleGenerator = require('./faker.js');

const tenThousandGenerator = () => {
  let count = 0;
  console.log('10K started at: ', Date.now());
  for (let i = 0; i < 10000; i += 1) {
    singleGenerator();
    count++;
    if(count === 10000) {
        console.log('10K ended at: ', Date.now());
    }
  }
};

const millionGenerator = () => {
    let count = 0;
    console.log('1M started at: ', Date.now());
    for (let i = 0; i < 1000000; i += 1) {
      singleGenerator();
      count++;
      if(count === 1000000) {
        console.log('1M ended at: ', Date.now());
      }
    }
  };
  
  exports.tenThousand = tenThousandGenerator;
  exports.oneMillion = millionGenerator;