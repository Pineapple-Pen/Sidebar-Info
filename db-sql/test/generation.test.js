const singleGen = require('../fake-sql/faker.js');
const {tenThousand} = require('../fake-sql/generation.js')

const samplePoint = singleGen();
const tenKSamples = tenThousand();

describe('single fake business generation', () => {
  test('should generate a single object:', () => {
    expect(Array.isArray(samplePoint)).toBe(true);
  });
  test('should have 22 properties:', () => {
    expect(samplePoint.length).toBe(22);
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

//Testing for nested schema only:

// describe('single weekday schedule generation', () => {
//   test('should generate an array of 7 weekday hours:', () => {
//     expect(Array.isArray(samplePoint.opening_hours.weekday_text.length)).toBe(7);
//   });
//   test('should generate an array of 7 schedules:', () => {
//     expect(samplePoint.opening_hours.periods.length).toBe(7);
//   });
// });
