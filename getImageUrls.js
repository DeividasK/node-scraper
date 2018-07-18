module.exports = {
  getImageUrls(textBlob) {
    const regExp = /"contentUrl": "(.+)"/gi;
    const matches = textBlob.match(regExp).map(match => {
      return match.replace('"contentUrl": "', '').replace('"', '');
    });

    return matches.slice(1);
  }
};
