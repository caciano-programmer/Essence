import { jwt, verifyJwt } from '../../server/auth/jwt';

const dummyObject = { dummyFeild: 'dummyData' };

test('function jwt should return a jwt', async () => {
  // make sure returns jwt in form of xxx.xxx.xxx
  await expect(jwt(dummyObject)).resolves.toMatch(/^..*\...*\...*$/);
});

test('verifyJwt function should throw error if not given a valid jwt token as parameter', async () => {
  const fakeJwt = 'Not a real jwt';
  await expect(verifyJwt(fakeJwt)).rejects.toThrow('Authentication failed');
});

test('verifyJwt function, should return correct payload of a jwt that was made with said payload', async () => {
  const testJwt = await jwt(dummyObject);
  await expect(verifyJwt(testJwt)).resolves.toMatchObject(dummyObject);
});
