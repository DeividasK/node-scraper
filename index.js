const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const { getListingId, getListingInfo } = require('./listing');
const { downloadImages } = require('./getImages');

// CONSTANTS
const LISTINGS_DIRECTORY = './listings';

async function getListings(listingsUrls) {
  try {
    const listingPromises = listingsUrls.map(url => {
      return getListing(url);
    });

    let listings = await Promise.all(listingPromises);

    listings = listings.reduce((acc, { listingId, listingInfo }) => {
      return { ...acc, [listingId]: listingInfo };
    }, {});

    console.log(`listings`, listings);
  } catch (error) {
    console.log(`error`, error);
  }
}

async function getListing(url) {
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

    return { listingId, listingInfo: getListingInfo(applicationJsonScriptTag) };
  } catch (error) {
    console.log(error);
  }
}

getListings(['https://www.zoopla.co.uk/for-sale/details/47576940']);
