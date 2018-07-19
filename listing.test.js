const HTML = require('./mocks/zoopla-property-page.js');
const APPLICATION_JSON_SCRIPT_TAG = require('./mocks/application-json-script-tag');

const {
  getAddress,
  getBedrooms,
  getDescription,
  getGeoCoordinates,
  getListingId,
  getListingInfo,
  getPropertyPrice,
  getPropertyType
} = require('./listing');

const zooplaUrl = 'https://www.zoopla.co.uk/for-sale/details/47576940';

describe('getListingInfo', () => {
  test('returns listing info', () => {
    expect(getListingInfo(APPLICATION_JSON_SCRIPT_TAG, HTML)).toMatchObject({
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
      },
      bedrooms: 4,
      propertyType: 'TERRACED',
      price: '£385,000',
      description:
        'A very desirable second floor flat situated in a period conversion. This property is the perfect investment for a first-time buyer consisting of bedroom, bathroom, reception room, kitchen.Conveniently located within walking distance to local shops, restaurants and bars, it is furthermore walking distance from Hamstead Heath and Tuffnell Park station.'
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

describe('getBedrooms', () => {
  test('returns bedrooms', () => {
    expect(getBedrooms(APPLICATION_JSON_SCRIPT_TAG)).toBe(4);
  });
});

describe('getPropertyType', () => {
  test('returns property type', () => {
    expect(getPropertyType('4 bed terraced house for sale')).toBe('TERRACED');
    expect(getPropertyType('1 bed flat for sale')).toBe('FLAT');
  });
});
