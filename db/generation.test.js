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

// describe('list generation', () => {
//   test('should generate an array of lists:', () => {
//     expect(Array.isArray(fakeBusinesses[0].metatags)).toBe(true);
//   });

//   test('should generate at least zero, and no more than three, lists:', () => {
//     for (let i = 0; i < fakeBusinesses.length; i += 1) {
//       expect(fakeBusinesses[i].listsWithThisBiz.length < 4).toBe(true);
//       expect(fakeBusinesses[i].listsWithThisBiz.length >= 0).toBe(true);
//     }
//   });
//   test('should generate the correct shape of lists:', () => {
//     for (let i = 0; i < fakeBusinesses.length; i += 1) {
//       if(fakeBusinesses[i].listsWithThisBiz.length > 0) {
//         const firstList = fakeBusinesses[i].listsWithThisBiz[0];
//         expect(typeof firstList).toBe('object');
//         expect(Object.keys(firstList).length).toBe(3);
//       }
//     }
//   });
// });