const cheerio = require('cheerio');

const { getImageNames } = require('./getImages');

function getAddress(applicationJsonScriptTag) {
  const address = applicationJsonScriptTag
    .match(/"streetAddress": "(.+)"/gi)[1]
    .replace('"streetAddress": "', '')
    .replace('"', '');

  const addressPartsSpace = address.split(' ');
  const addressPartsComma = address.split(',');

  const outcode = addressPartsSpace[addressPartsSpace.length - 1];
  const borough = addressPartsComma[addressPartsComma.length - 1]
    .replace(outcode, '')
    .trim();
  const street = addressPartsComma[0];

  return { borough, outcode, street };
}

function getBedrooms(applicationJsonScriptTag) {
  const residenceNameField = applicationJsonScriptTag
    .replace(/\r?\n|\r/g, '')
    .match(/"@type": "Residence",(.*)"name": "(.*)",(.*)"description"/gim)[0]
    .replace(/"description"/, '')
    .match(/"name": "(.*)"/)[1];

  const bedrooms = residenceNameField.match(/\d/)[0];

  return parseInt(bedrooms);
}

function getPropertyType(residenceNameField) {
  if (/terraced/.test(residenceNameField)) {
    return 'TERRACED';
  }

  if (/flat/.test(residenceNameField)) {
    return 'FLAT';
  }

  return null;
}

function getGeoCoordinates(applicationJsonScriptTag) {
  const lat = applicationJsonScriptTag
    .match(/"latitude": "(.+)"/gi)[0]
    .replace('"latitude": "', '')
    .replace('"', '');

  const lng = applicationJsonScriptTag
    .match(/"longitude": "(.+)"/gi)[0]
    .replace('"longitude": "', '')
    .replace('"', '');

  return { lat: parseFloat(lat, 10), lng: parseFloat(lng, 10) };
}

function getListingId(url) {
  const regExp = /\/(\d+)/;
  return regExp.exec(url)[1];
}

function getPropertyPrice(html) {
  const $ = cheerio.load(html);
}

function getListingInfo(applicationJsonScriptTag, html) {
  const $ = cheerio.load(html);

  const residenceNameField = applicationJsonScriptTag
    .replace(/\r?\n|\r/g, '')
    .match(/"@type": "Residence",(.*)"name": "(.*)",(.*)"description"/gim)[0]
    .replace(/"description"/, '')
    .match(/"name": "(.*)"/)[1];

  const description = $('.dp-description__text')
    .text()
    .trim();
  const price = $('.dp-sidebar-wrapper .ui-pricing__main-price')
    .text()
    .trim();

  const keyFeatures = $('.dp-features__list.ui-list-bullets li')
    .map((index, child) => {
      return $(child).text();
    })
    .toArray();

  return {
    images: getImageNames(applicationJsonScriptTag),
    address: {
      ...getAddress(applicationJsonScriptTag),
      ...getGeoCoordinates(applicationJsonScriptTag)
    },
    bedrooms: getBedrooms(applicationJsonScriptTag),
    propertyType: getPropertyType(residenceNameField),
    price,
    description,
    keyFeatures
  };
}

module.exports = {
  getAddress,
  getBedrooms,
  getGeoCoordinates,
  getListingId,
  getListingInfo,
  getPropertyType
};
