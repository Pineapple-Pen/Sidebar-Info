const faker = require('faker');

// The following generates one single fake datapoint.
module.exports = (number) => {
  const result = {
    place_id: number,
    name: `${faker.company.companyName()}`,
    formatted_address: 
    `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`,
    international_phone_number: `${faker.phone.phoneNumber()}`,
    email: `${faker.internet.email()}`,
    url: `${faker.internet.url()}`,
    open_now: faker.random.boolean(),
    mondayOpenTime: `12:00 AM`,
    mondayCloseTime: `4:00 PM`,
    tuesdayOpenTime: `4:00 AM`,
    tuesdayCloseTime: `8:00 PM`,
    wednesdayOpenTime: `2:00 AM`,
    wednesdayCloseTime: `5:00 PM`,
    thursdayOpenTime: `3:00 AM`,
    thursdayCloseTime: `7:00 PM`,
    fridayOpenTime: `3:00 AM`,
    fridayCloseTime: `9:00 PM`,
    saturdayOpenTime: `8:00 AM`,
    saturdayCloseTime: `9:00 PM`,
    sundayOpenTime: `2:00 AM`,
    sundayCloseTime: `11:00 PM`,
    lat: faker.address.latitude(),
    lng: faker.address.longitude()
   
  }
  // return single constructed datapoint 
  return result;
}


