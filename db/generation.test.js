const singleGen = require('../fake-nosql/faker.js');
const {tenThousand, oneMillion} = require('../fake-nosql/generation.js')

const samplePoint = singleGen();
const tenKSamples = tenThousand();
const oneMSamples = oneMillion();

describe('fake business generation', () => {
  test('should generate a single object:', () => {
    expect(typeof samplePoint).toBe('object');
  });
  test('should have 7 properties:', () => {
    expect(Object.keys(samplePoint).length).toBe(7);
  });
});

describe('weekday schedule generation', () => {
  test('should generate an array of 7 weekday hours:', () => {
    expect(Array.isArray(samplePoint.opening_hours.weekday_text.length)).toBe(7);
  });
  test('should generate an array of 7 schedules:', () => {
    expect(samplePoint.opening_hours.periods.length).toBe(7);
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

describe('1M sample generation', () => {
  test('should generate an array of datapoints:', () => {
    expect(Array.isArray(oneMSamples)).toBe(true);
  });
  test('should generate 1M datapoints:', () => {
    expect(oneMSamples.length).toBe(1000000);
  });
});
