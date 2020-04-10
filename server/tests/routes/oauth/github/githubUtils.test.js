import { githubUrl, getUserData, getAccessToken } from '../../../../server/routes/oauth/github/githubUtils';

describe('test for githubUrl function', () => {
  test('function should return string url that contains token', () => {
    const urlRegex = /^.*randomtoken.*$/;
    const url = githubUrl('randomtoken');
    expect(urlRegex.test(url)).toBe(true);
  });
});

describe('test for getUserData function', () => {
  test('getUserData should throw error if access token fails to retrieve data', async () => {
    const invalidToken = 'this is an invalid token for testing purposes';
    await expect(getUserData(invalidToken)).rejects.toThrow('Server error getting github user data.');
  });
});

// this test will fail regardless because github config is private, unless you use insert you own valid client id/secret
describe('test for getAccessToken function', () => {
  test('response should indicate bad code entered', async () => {
    const invalidCode = 'this is an invalid code for testing purposes';
    await expect(getAccessToken(invalidCode)).rejects.toThrow();
  });
});
