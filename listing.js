const { getImageNames } = require('./getImages');

function getListingId(url) {
  const regExp = /\/(\d+)/;
  return regExp.exec(url)[1];
}

function getListingInfo(applicationJsonScriptTag) {
  return {
    images: getImageNames(applicationJsonScriptTag)
  };
}

module.exports = {
  getListingId,
  getListingInfo
};
