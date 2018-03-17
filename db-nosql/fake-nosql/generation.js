const singleGenerator = require('./faker.js');

const tenThousandGenerator = (start) => { // 0, 250, 500, or 750
  let count = 0;
  let result = [];
  for (let i = 0; i < 10000; i += 1) {
    result.push(singleGenerator(start + i)); // ind number that is place_id
    count++;
    if(count === 10000) {
      return result;
    }
  }
}
  
exports.tenThousand = tenThousandGenerator;