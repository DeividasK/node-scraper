const KEY_FEATURES_ = require('./mocks/terraced-key-features-property.js');
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
    expect(
      getListingInfo(APPLICATION_JSON_SCRIPT_TAG, KEY_FEATURES_)
    ).toMatchObject({
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
      price: '£650,000',
      description:
        'Inside the entrance hallway serves the first floor and open plan living space that is 38 feet deep from the front reception through to the extended kitchen/diner. This amazing living space has restored sash windows to the front and modern double glazed windows to the rear with skylights and then bi-fold doors out to the landscaped garden . A guest cloakroom/WC is conveniently positioned adjacent to the kitchen with access into the cellar, ideal for storage. The stylish kitchen has an island/breakfast bar and integrated appliances throughout including zoned lighting and boasts engineered wood flooring which runs throughout the ground floor.The first floor comprises three double bedrooms, two of relatively equal proportions and a larger third positioned to the rear, each carpeted, with double glazed timber sash windows to the front and class A PVC double glazing to the rear. A contemporary bathroom is to the front of the house, benefiting from a shower over the bath. The first floor landing has built in storage which accommodates a washing machine and has additional space for a dryer - removing the noise from the open plan living space downstairs. A further flight of stairs leads to the principle bedroom within the converted loft. This fourth room boasts breathtaking views across London and the Docklands from the bespoke windows. It has an en-suite with a high spec shower suite, and is so light and bright.',
      keyFeatures: [
        'Private garden',
        'Central heating',
        'Four double bedrooms',
        'Extensively refurbished',
        'Loft conversion and side return extension',
        'Additional cellar space'
      ]
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
