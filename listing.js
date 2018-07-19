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

function getListingInfo(applicationJsonScriptTag) {
  return {
    images: getImageNames(applicationJsonScriptTag),
    address: {
      ...getAddress(applicationJsonScriptTag),
      ...getGeoCoordinates(applicationJsonScriptTag)
    }
  };
}

module.exports = {
  getAddress,
  getGeoCoordinates,
  getListingId,
  getListingInfo
};
