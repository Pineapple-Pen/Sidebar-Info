const faker = require('faker');

// The following generates one single fake datapoint.

const afternoonTime = () => Math.ceil(Math.random()*12) + 12

const morningTime = () => Math.ceil(Math.random()*12)

module.exports = () => {
  const result = {
    place_name: `${faker.company.companyName()}`,
    formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`,
    international_phone_number: `${faker.phone.phoneNumber()}`,
    email: `${faker.internet.email()}`,
    website: `${faker.internet.url()}`,
    open_now: faker.random.boolean(),
    mon_open: morningTime(),
    mon_close: afternoonTime(),
    tue_open: morningTime(),
    tue_close: afternoonTime(),
    wed_open: morningTime(),
    wed_close: afternoonTime(),
    thu_open: morningTime(),
    thu_close: afternoonTime(),
    fri_open: morningTime(),
    fri_close: afternoonTime(),
    sat_open: morningTime(),
    sat_close: afternoonTime(),
    sun_open: morningTime(),
    sun_close: afternoonTime(),
    position: `(${faker.address.latitude()}, ${faker.address.longitude()})` 
  }
  // return single constructed datapoint 
  return result;
}


