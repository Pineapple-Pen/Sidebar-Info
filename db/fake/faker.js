const faker = require('faker');

// The following generates one single fake datapoint.
const singlePoint = () => {
  const result = {
    name: `${faker.company.companyName()}`,
    formatted_address: 
    `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`,
    international_phone_number: `${faker.phone.phoneNumber()}`,
    website: `${faker.internet.email()}`,
    url: `${faker.internet.url()}`,
    opening_hours: {
      open_now: faker.random.boolean(),
      periods: [],
      weekday_text: []
    },
    geometry: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      }
    }
  }
  // create open and close times.
  for (i = 0; i < 7; i++) {
    result.opening_hours.periods.push({
      close: {
        day: i,
        time: `${Math.ceil(Math.random() * 12)}:00 PM`
      },
      open: {
        day: i,
        time: `${Math.ceil(Math.random() * 12)}:00 AM`
      }
    });
  }
  // create formatted open and close hours for each weekday
  for (i = 0; i < result.opening_hours.periods.length; i++) {
    const thisPeriod = result.opening_hours.periods[i];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    result.opening_hours.weekday_text.push(`${weekdays[thisPeriod.close.day]}: ${thisPeriod.open.time} - ${thisPeriod.close.time}`)
  }
  // return single constructed datapoint 
  return result;
}

console.log('started at: ', Date.now());
for(let i = 0; i < 10,000; i++) {
  singlePoint();
}
console.log('ended at: ', Date.now());
