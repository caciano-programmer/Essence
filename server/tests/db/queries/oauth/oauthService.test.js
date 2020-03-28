import { oauthService } from '../../../../server/db/queries/oauth/oauthService';
import { AccountTypes } from '../../../../server/db/accountTypes';
import { initDB as db } from '../../../../server/db/dbConfig';

const oauthTestUser = { name: 'foobar', email: 'foobar@test.com' };
const oauthTestUser2 = { name: 'foobar2', email: 'foobar2@test.com' };
const oauthTestUser3 = { name: 'foobar3', email: 'foobar3@test.com' };
const google = oauthService(AccountTypes.GOOGLE);
const github = oauthService(AccountTypes.GITHUB);

afterAll(async () => {
  await db(AccountTypes.GOOGLE).del();
  await db(AccountTypes.GITHUB).del();
  await db.destroy();
});

describe('tests for oauth database service', () => {
  test('should throw error if type is not GOOGLE or GITHUB', () => {
    const badType = 'this is a fake test type';
    const testFunc = () => {
      oauthService(badType);
    };
    expect(testFunc).toThrow('Server Error');
  });
  test('if valid type oauth service should return object with all methods and shouldnt throw error', () => {
    const testFunc = () => {
      oauthService(AccountTypes.GOOGLE);
    };
    expect(testFunc).not.toThrow();
    expect(oauthService(AccountTypes.GOOGLE)).toMatchObject({
      createOauthUser: expect.any(Function),
      checkOauthUserExists: expect.any(Function),
      createWhenNewUser: expect.any(Function),
    });
  });
  test('createOauthUser function should insert user into corresponding database', async () => {
    await google.createOauthUser(oauthTestUser);
    await github.createOauthUser(oauthTestUser);
    const [googleDatabaseUser] = await db(AccountTypes.GOOGLE).where({ email: oauthTestUser.email });
    const [githubDatabaseUser] = await db(AccountTypes.GITHUB).where({ email: oauthTestUser.email });
    expect(googleDatabaseUser).toMatchObject(oauthTestUser);
    expect(githubDatabaseUser).toMatchObject(githubDatabaseUser);
  });
  test('checkOauthUserExists function should return false if no user exists', async () => {
    await expect(google.checkOauthUserExists(oauthTestUser2.email)).resolves.toBe(false);
    await expect(github.checkOauthUserExists(oauthTestUser2.email)).resolves.toBe(false);
  });
  test('checkOauthUserExists function should return true if user exists', async () => {
    await db(AccountTypes.GOOGLE).insert(oauthTestUser2);
    await db(AccountTypes.GITHUB).insert(oauthTestUser2);
    await expect(google.checkOauthUserExists(oauthTestUser2.email)).resolves.toBe(true);
    await expect(github.checkOauthUserExists(oauthTestUser2.email)).resolves.toBe(true);
  });
  test('createWhenNewUser function should create new user if given user does not exist', async () => {
    await google.createWhenNewUser(oauthTestUser3);
    await github.createWhenNewUser(oauthTestUser3);
    const googleTestUser3Exists = (await db(AccountTypes.GOOGLE).where({ email: oauthTestUser3.email })).length > 0;
    const githubTestUser3Exists = (await db(AccountTypes.GITHUB).where({ email: oauthTestUser3.email })).length > 0;
    expect(googleTestUser3Exists).toBe(true);
    expect(githubTestUser3Exists).toBe(true);
  });
});
