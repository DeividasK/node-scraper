const APPLICATION_JSON_SCRIPT_TAG = require('./mocks/application-json-script-tag');

const {
  getAddress,
  getGeoCoordinates,
  getListingId,
  getListingInfo
} = require('./listing');

const zooplaUrl = 'https://www.zoopla.co.uk/for-sale/details/47576940';

describe('getListingInfo', () => {
  test('returns listing info', () => {
    expect(getListingInfo(APPLICATION_JSON_SCRIPT_TAG)).toMatchObject({
      images: [
        '1-197dc390bc20c1f7a5c1135232f0afe36c7a17a5.png',
        '2-fcaa36eac303ea19f74c93e3eaa2f3f0d105bafc.png',
        '3-28d69406992adf99566d79b341ea2f385d2a0964.jpg'
      ],
      address: {
        borough: 'Charlton',
        lat: 51.483893,
        lng: 0.026893,
        outcode: 'SE7',
        street: 'Victoria Way'
      }
    });
  });
});

describe('getListingId', () => {
  test('returns listing id given a url', () => {
    expect(getListingId(zooplaUrl)).toBe('47576940');
  });
});

describe('getGeoCoordinates', () => {
  test('returns geo coordinates', () => {
    expect(getGeoCoordinates(APPLICATION_JSON_SCRIPT_TAG)).toMatchObject({
      lat: 51.483893,
      lng: 0.026893
    });
  });
});

describe('getAddress', () => {
  test('returns address object', () => {
    expect(getAddress(APPLICATION_JSON_SCRIPT_TAG)).toMatchObject({
      street: 'Victoria Way',
      borough: 'Charlton',
      outcode: 'SE7'
    });
  });
});
