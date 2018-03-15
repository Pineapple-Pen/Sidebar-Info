const singleGenerator = require('./faker.js');

const tenThousandGenerator = (cb) => {
  console.log('10K seeding started at: ', Date.now());
  let count = 0;
  let result = [];
  for (let i = 0; i < 10000; i += 1) {
    result.push(singleGenerator(i));
    count++;
    if(count === 10000) {
      cb(result);
    }
  }
};

const millionGenerator = (cb) => {
  console.log('1M seeding started at: ', Date.now());
  let count = 0;
  let result = [];
  const inner = () => {
    console.log('Seeding section: ', Date.now());
    for (let i = 0; i < 10000; i += 1) {
      result.push(singleGenerator(i));
      count++;
      cb(result);
    }
    if(count === 1000000) {
      return;
    } else {
      result = [];
      inner();
    }
  }
  inner();
};
  
  exports.tenThousand = tenThousandGenerator;
  exports.oneMillion = millionGenerator;