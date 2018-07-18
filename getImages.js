function getImageUrls(textBlob) {
  const regExp = /"contentUrl": "(.+)"/gi;
  const matches = textBlob.match(regExp).map(match => {
    return match.replace('"contentUrl": "', '').replace('"', '');
  });

  return matches.slice(1);
}

function getImages(textBlob) {
  const imageUrls = getImageUrls(textBlob);

  return imageUrls.map((url, index) => {
    const urlParts = url.split('/');
    const name = `${index + 1}-${urlParts[urlParts.length - 1]}`;
    return {
      name,
      url
    };
  });
}

module.exports = {
  getImageUrls,
  getImages
};
