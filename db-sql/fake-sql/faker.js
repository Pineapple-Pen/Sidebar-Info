const faker = require('faker');

// The following generates one single fake datapoint.
module.exports = () => {
  const result = [
    `${faker.company.companyName()}`,
    `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`,
    `${faker.phone.phoneNumber()}`,
    `${faker.internet.email()}`,
    `${faker.internet.url()}`,
    faker.random.boolean(),
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    Math.ceil(Math.random()*12),
    Math.ceil(Math.random()*12)+12,
    `(${faker.address.latitude()}, ${faker.address.longitude()})`
  ]
  // return single constructed datapoint 
  return result;
}


