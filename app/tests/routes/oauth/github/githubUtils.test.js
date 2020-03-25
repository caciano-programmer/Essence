import { githubUrl, getUserData } from '../../../../server/routes/oauth/github/githubUtils';

describe('test for githubUrl function', () => {
  test('function should return string url that matches sepecified form', () => {
    const urlRegex = /^.*random\stoken.*$/m;
    const url = githubUrl('random token');
    expect(urlRegex.test(url)).toBe(true);
  });
});

// describe('test for getUserData function', () => {
//   test('getUserData should throw status code 401 unauthorized', async () => {
//     const invalidToken = 'this is an invalid token for testing purposes';
//     const result = await getUserData(invalidToken);
//     console.log(`============= ${result} =============`);
//     expect(result).toBe(false);
//   });
// });
