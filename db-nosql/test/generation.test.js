const singleGen = require('../fake-nosql/faker.js');
const {tenThousand} = require('../fake-nosql/generation.js')

const samplePoint = singleGen();
const tenKSamples = tenThousand();

describe('single fake business generation', () => {
  test('should generate a single object:', () => {
    expect(typeof samplePoint).toBe('object');
  });
  test('should have 22 properties:', () => {
    expect(Object.keys(samplePoint).length).toBe(22);
  });
});

describe('10K sample generation', () => {
  test('should generate an array of datapoints:', () => {
    expect(Array.isArray(tenKSamples)).toBe(true);
  });
  test('should generate 10K datapoints:', () => {
    expect(tenKSamples.length).toBe(10000);
  });
});
