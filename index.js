const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const { getListingId } = require('./getListingId');
const { getImages } = require('./getImages');

// CONSTANTS
const LISTINGS_DIRECTORY = './listings';

async function start(url) {
  try {
    if (!fs.existsSync(LISTINGS_DIRECTORY)) {
      fs.mkdirSync(LISTINGS_DIRECTORY);
    }

    const listingId = getListingId(url);
    const listingSpecificFolder = path.resolve(LISTINGS_DIRECTORY, listingId);

    if (!fs.existsSync(listingSpecificFolder)) {
      fs.mkdirSync(listingSpecificFolder);
    }

    const response = await fetch(url);

    const $ = cheerio.load(await response.text());

    let applicationJsonScriptTag = $('script[type="application/ld+json"]')
      .contents()
      .text();

    const images = getImages(applicationJsonScriptTag);

    await fetch(images[0].url).then(res => {
      return new Promise((resolve, reject) => {
        const imagePath = path.resolve(
          LISTINGS_DIRECTORY,
          listingId,
          images[0].name
        );

        const dest = fs.createWriteStream(imagePath);

        res.body.pipe(dest);
        res.body.on('error', err => {
          reject(err);
        });
        dest.on('finish', () => {
          resolve();
        });
        dest.on('error', err => {
          reject(err);
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

start('https://www.zoopla.co.uk/for-sale/details/47576940');
