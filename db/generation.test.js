const generator = require('../fake/faker.js');

const samplePoint = generator();

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
