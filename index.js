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
      return { ...acc, [listingId]: { externalId: listingId, ...listingInfo } };
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

getListings([
  'https://www.zoopla.co.uk/for-sale/details/47910606'
  // 'https://www.zoopla.co.uk/for-sale/details/47614577',
  // 'https://www.zoopla.co.uk/for-sale/details/48141019',
  // 'https://www.zoopla.co.uk/for-sale/details/45397791',
  // 'https://www.zoopla.co.uk/for-sale/details/45135921',
  // 'https://www.zoopla.co.uk/for-sale/details/47316059',
  // 'https://www.zoopla.co.uk/for-sale/details/45587924',
  // 'https://www.zoopla.co.uk/for-sale/details/47842027',
  // 'https://www.zoopla.co.uk/for-sale/details/46049280',
  // 'https://www.zoopla.co.uk/for-sale/details/48185292',
  // 'https://www.zoopla.co.uk/for-sale/details/47409387',
  // 'https://www.zoopla.co.uk/for-sale/details/47618627',
  // 'https://www.zoopla.co.uk/for-sale/details/46750818',
  // 'https://www.zoopla.co.uk/for-sale/details/48186612',
  // 'https://www.zoopla.co.uk/for-sale/details/48239010',
  // 'https://www.zoopla.co.uk/for-sale/details/47665573',
  // 'https://www.zoopla.co.uk/for-sale/details/47806225',
  // 'https://www.zoopla.co.uk/for-sale/details/45010143',
  // 'https://www.zoopla.co.uk/for-sale/details/47648470',
  // 'https://www.zoopla.co.uk/for-sale/details/47807537',
  // 'https://www.zoopla.co.uk/for-sale/details/47380643',
  // 'https://www.zoopla.co.uk/for-sale/details/47962467',
  // 'https://www.zoopla.co.uk/for-sale/details/48326353',
  // 'https://www.zoopla.co.uk/for-sale/details/48140623',
  // 'https://www.zoopla.co.uk/for-sale/details/47543570',
  // 'https://www.zoopla.co.uk/for-sale/details/47760896',
  // 'https://www.zoopla.co.uk/for-sale/details/47576940',
  // 'https://www.zoopla.co.uk/for-sale/details/43760134',
  // 'https://www.zoopla.co.uk/for-sale/details/47634962',
  // 'https://www.zoopla.co.uk/for-sale/details/47950049',
  // 'https://www.zoopla.co.uk/for-sale/details/45723591',
  // 'https://www.zoopla.co.uk/for-sale/details/48152449',
  // 'https://www.zoopla.co.uk/for-sale/details/47315885',
  // 'https://www.zoopla.co.uk/for-sale/details/47451303',
  // 'https://www.zoopla.co.uk/for-sale/details/45186129',
  // 'https://www.zoopla.co.uk/for-sale/details/46204835',
  // 'https://www.zoopla.co.uk/for-sale/details/48186770',
  // 'https://www.zoopla.co.uk/for-sale/details/45623346',
  // 'https://www.zoopla.co.uk/for-sale/details/45086323',
  // 'https://www.zoopla.co.uk/for-sale/details/47860424',
  // 'https://www.zoopla.co.uk/for-sale/details/48221881',
  // 'https://www.zoopla.co.uk/for-sale/details/47616592',
  // 'https://www.zoopla.co.uk/for-sale/details/48104757',
  // 'https://www.zoopla.co.uk/for-sale/details/47703819',
  // 'https://www.zoopla.co.uk/for-sale/details/45940717',
  // 'https://www.zoopla.co.uk/for-sale/details/46199228',
  // 'https://www.zoopla.co.uk/for-sale/details/45786570',
  // 'https://www.zoopla.co.uk/for-sale/details/43619171',
  // 'https://www.zoopla.co.uk/for-sale/details/48134001',
  // 'https://www.zoopla.co.uk/for-sale/details/45563166'
]);
