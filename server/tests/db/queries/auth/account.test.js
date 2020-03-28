import { createUser, authenticateUser } from '../../../../server/db/queries/auth/account';
import { initDB as db } from '../../../../server/db/dbConfig';
import { AccountTypes } from '../../../../server/db/accountTypes';

const testUser01 = { name: 'foobar', email: 'foobar@test.com', password: 'fooBar01' };
const testUser02 = { name: 'foobartwo', email: 'foobar2@test.com', password: 'fooBar02' };

beforeAll(async () => {
  await createUser(testUser02);
});

afterAll(async () => {
  await db(AccountTypes.BASIC).del();
  await db.destroy();
});

describe('tests for createUser function', () => {
  test('if new user, new user should be created in database', async () => {
    await createUser(testUser01);
    const [user] = await db(AccountTypes.BASIC).where({ email: testUser01.email });
    expect(user).toMatchObject({
      name: 'foobar',
      email: 'foobar@test.com',
      password: expect.any(String),
      createdOn: expect.any(Date),
    });
  });
  test('if user exists already shouls throw error', async () => {
    await expect(createUser(testUser02)).rejects.toThrow('Email already exist');
  });
});

describe('tests for authenticateUser function', () => {
  test('should throw error if user doesnt exist', async () => {
    const fakeUser = {
      nonExistentEmail: 'thisEmailDoesntExist@fake.com',
      fakePassword: 'fakePassword01',
    };
    await expect(authenticateUser(fakeUser.nonExistentEmail, fakeUser.fakePassword)).rejects.toThrow(
      'Email does not exist, plase check spelling',
    );
  });
  test('should throw error if bad password entered', async () => {
    const badPassword = 'this is a fake test password';
    await expect(authenticateUser(testUser02.email, badPassword)).rejects.toThrow(
      'Password is incorrect, please try again',
    );
  });
  test('return promise should resolve if email and password are valid', async () => {
    await expect(authenticateUser(testUser02.email, testUser02.password)).resolves.toBeUndefined();
  });
});
