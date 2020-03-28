import { githubUrl, getUserData, getAccessToken } from '../../../../server/routes/oauth/github/githubUtils';

describe('test for githubUrl function', () => {
  test('function should return string url that matches sepecified form', () => {
    const urlRegex = /^.*random\stoken.*$/m;
    const url = githubUrl('random token');
    expect(urlRegex.test(url)).toBe(true);
  });
});

describe('test for getUserData function', () => {
  test('getUserData should throw error if access token fails to retrieve data', async () => {
    const invalidToken = 'this is an invalid token for testing purposes';
    await expect(getUserData(invalidToken)).rejects.toThrow('Server error getting github user data.');
  });
});

describe('test for getAccessToken function', () => {
  test('function should catch error for invalid access code used', async () => {
    const invalidCode = 'this is an invalid code for testing purposes';
    const {
      data: { error },
    } = await getAccessToken(invalidCode);
    expect(error).toMatch(error);
  });
});
