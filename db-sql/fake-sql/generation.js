const singleGenerator = require('./faker.js');

const tenThousandGenerator = () => {
  let count = 0;
  let result = [];
  for (let i = 0; i < 10000; i += 1) {
    result.push(singleGenerator()); 
    count++;
    if(count === 10000) {
      return result;
    }
  }
}

exports.tenThousand = tenThousandGenerator;
exports.singlePoint = singleGenerator;