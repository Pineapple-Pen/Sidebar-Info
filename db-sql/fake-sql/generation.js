const singleGenerator = require('./faker.js');

const tenThousandGenerator = (start) => { // 0, 250, 500, or 750
  let count = 0;
  let result = [];
  for (let i = 0; i < 10000; i += 1) {
    result.push(singleGenerator(i)); // ind number that is place_id
    count++;
    if(count === 10000) {
      return result;
    }
  }
}
console.log('checking shape, generation.js: ', singleGenerator()); 
exports.tenThousand = tenThousandGenerator;
exports.singlePoint = singleGenerator;