const singleGenerator = require('./faker.js');

const tenThousandGenerator = (start) => { // 0, 250, 500, or 750
    // console.log('10K seeding started at: ', Date.now())
    let count = 0;
    let result = [];
    for (let i = 0; i < 10000; i += 1) {
      result.push(singleGenerator((start*10000) + i)); //ind number that is place_id
      count++;
      if(count === 10000) {
        return result;
      }
    }

}

const millionGenerator = () => {
  // console.log('1M seeding started at: ', Date.now())
  let count = 0;
  let result = [];
  for (let i = 0; i < 1000000; i += 1) {
    result.push(singleGenerator(i));
    count++;
    if(count === 1000000) {
      return result;
    }
  } 
};
  
  exports.tenThousand = tenThousandGenerator;
  exports.oneMillion = millionGenerator;