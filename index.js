const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const { getListingId } = require('./getListingId');
const { downloadImages } = require('./getImages');

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

    await downloadImages(applicationJsonScriptTag, {
      directory: LISTINGS_DIRECTORY,
      listingId
    });
  } catch (error) {
    console.log(error);
  }
}

start('https://www.zoopla.co.uk/for-sale/details/47576940');
