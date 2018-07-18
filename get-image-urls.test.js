const APPLICATION_JSON_SCRIPT_TAG = require('./mocks/application-json-script-tag');
const { getImageUrls } = require('./getImageUrls');

test('returns listing id given a url', () => {
  expect(getImageUrls(APPLICATION_JSON_SCRIPT_TAG)).toMatchObject([
    'https://lid.zoocdn.com/645/430/197dc390bc20c1f7a5c1135232f0afe36c7a17a5.png',
    'https://lid.zoocdn.com/645/430/fcaa36eac303ea19f74c93e3eaa2f3f0d105bafc.png',
    'https://lid.zoocdn.com/645/430/28d69406992adf99566d79b341ea2f385d2a0964.jpg'
  ]);
});
