const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

async function downloadImages(
  applicationJsonScriptTag,
  { directory, listingId }
) {
  const images = getImages(applicationJsonScriptTag);

  const imagePromises = images.map(imageObject => {
    return fetch(imageObject.url).then(res => {
      return new Promise((resolve, reject) => {
        const imagePath = path.resolve(directory, listingId, imageObject.name);

        const dest = fs.createWriteStream(imagePath);

        res.body.pipe(dest);
        res.body.on('error', err => {
          reject(err);
        });
        dest.on('finish', () => {
          console.log(
            `Finished downloading ${
              imageObject.name
            } image for listing ${listingId}.`
          );
          resolve();
        });
        dest.on('error', err => {
          console.log(
            `Error when downloading ${
              imageObject.name
            } image for listing ${listingId}.`
          );
          reject(err);
        });
      });
    });
  });

  return Promise.all(imagePromises);
}

function getImageUrls(applicationJsonScriptTag) {
  const regExp = /"contentUrl": "(.+)"/gi;
  const matches = applicationJsonScriptTag.match(regExp).map(match => {
    return match.replace('"contentUrl": "', '').replace('"', '');
  });

  return matches.slice(1);
}

function getImages(applicationJsonScriptTag) {
  const imageUrls = getImageUrls(applicationJsonScriptTag);

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
  downloadImages,
  getImageUrls,
  getImages
};
