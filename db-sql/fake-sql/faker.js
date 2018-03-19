const faker = require('faker');

// The following generates one single fake datapoint.

module.exports = () => {
  const result = {
    place_name: `${faker.company.companyName()}`,
    formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`,
    international_phone_number: `${faker.phone.phoneNumber()}`,
    email: `${faker.internet.email()}`,
    website: `${faker.internet.url()}`,
    open_now: faker.random.boolean(),
    mon_open: Math.ceil(Math.random()*12),
    mon_close: Math.ceil(Math.random()*12) + 12,
    tue_open: Math.ceil(Math.random()*12),
    tue_close: Math.ceil(Math.random()*12) + 12,
    wed_open: Math.ceil(Math.random()*12),
    wed_close: Math.ceil(Math.random()*12) + 12,
    thu_open: Math.ceil(Math.random()*12),
    thu_close: Math.ceil(Math.random()*12) + 12,
    fri_open: Math.ceil(Math.random()*12),
    fri_close: Math.ceil(Math.random()*12) + 12,
    sat_open: Math.ceil(Math.random()*12),
    sat_close: Math.ceil(Math.random()*12) + 12,
    sun_open: Math.ceil(Math.random()*12),
    sun_close: Math.ceil(Math.random()*12) + 12,
    position: `(${faker.address.latitude()}, ${faker.address.longitude()})` 
  }
  // return single constructed datapoint 
  return result;
}


