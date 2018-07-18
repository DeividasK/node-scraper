module.exports = {
  getListingId(url) {
    const regExp = /\/(\d+)/;
    return regExp.exec(url)[1];
  }
};
