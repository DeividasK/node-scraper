const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const { getListingId } = require('./getListingId');

// CONSTANTS
const LISTINGS_DIRECTORY = './listings';

async function start(url) {
  if (!fs.existsSync(LISTINGS_DIRECTORY)) {
    fs.mkdirSync(LISTINGS_DIRECTORY);
  }

  const listingId = getListingId(url);
  const listingSpecificFolder = path.resolve(LISTINGS_DIRECTORY, listingId);

  if (!fs.existsSync(listingSpecificFolder)) {
    fs.mkdirSync(listingSpecificFolder);
  }

  try {
    const response = await fetch(url);

    const $ = cheerio.load(await response.text());

    let text = $('script[type="application/ld+json"]')
      .contents()
      .text();

    text = text.replace(/\s\n/, '');
    console.log(`text`, text);
  } catch (error) {
    console.log(error);
  }
}

start('https://www.zoopla.co.uk/for-sale/details/47576940');
