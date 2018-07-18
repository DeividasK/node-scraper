const { getListingId } = require('./getListingId');

const zooplaUrl = 'https://www.zoopla.co.uk/for-sale/details/47576940';

test('returns listing id given a url', () => {
  expect(getListingId(zooplaUrl)).toBe('47576940');
});
