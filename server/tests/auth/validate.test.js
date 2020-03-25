import { validateSignup, validateLogin } from '../../server/auth/validate';

const validSignup = { name: 'Bob', email: 'bob@test.com', confirm: 'bob@test.com', password: 'Password01' };
const validLogin = { email: 'bob@test.com', password: 'Password01' };

describe('Tests for validateSignup function:', () => {
  test('should throw error if any feild in signup is missing', async () => {
    const validSignupCopy = { ...validSignup };
    // deletes random propery in object
    delete validSignupCopy[Object.keys(validSignupCopy)[Math.floor(Math.random() * 4)]];
    await expect(validateSignup(validSignupCopy)).rejects.toThrow(Error);
  });
  test('signup emails should match', async () => {
    const validSignupCopy = { ...validSignup };
    validSignupCopy.confirm = 'joe@test.com';
    await expect(validateSignup(validSignupCopy)).rejects.toThrow('Emails must match');
  });
  test('password should not contain colon character', async () => {
    const validSignupCopy = { ...validSignup };
    validSignupCopy.password = 'Password:01';
    await expect(validateSignup(validSignupCopy)).rejects.toThrow('Password must not contain colon character ":"');
  });
  test('password must include lower case letters', async () => {
    const validSignupCopy = { ...validSignup };
    validSignupCopy.password = 'PASSWORD01';
    await expect(validateSignup(validSignupCopy)).rejects.toThrow('Password must contain lower case letters');
  });
  test('password must include upper case letters', async () => {
    const validSignupCopy = { ...validSignup };
    validSignupCopy.password = 'password01';
    await expect(validateSignup(validSignupCopy)).rejects.toThrow('Password must contain upper case letters');
  });
  test('Password must contain numbers', async () => {
    const validSignupCopy = { ...validSignup };
    validSignupCopy.password = 'Password';
    await expect(validateSignup(validSignupCopy)).rejects.toThrow('Password must contain numbers');
  });
  test('function returns credentials if they were valid', async () => {
    await expect(validateSignup(validSignup)).resolves.toEqual(validSignup);
  });
});

describe('Tests for validateLogin function:', () => {
  test('should throw error if any feild in login is missing', async () => {
    const validLoginCopy = { ...validLogin };
    // deletes random propery in object
    delete validLoginCopy[Object.keys(validLoginCopy)[Math.floor(Math.random() * 2)]];
    await expect(validateSignup(validLoginCopy)).rejects.toThrow(Error);
  });
  test('password for login should not contain colon character', async () => {
    const validLoginCopy = { ...validLogin };
    validLoginCopy.password = 'Password:01';
    await expect(validateLogin(validLoginCopy)).rejects.toThrow('Password must not contain colon character ":"');
  });
  test('password for login must include lower case letters', async () => {
    const validLoginCopy = { ...validLogin };
    validLoginCopy.password = 'PASSWORD01';
    await expect(validateLogin(validLoginCopy)).rejects.toThrow('Password must contain lower case letters');
  });
  test('password for login must include upper case letters', async () => {
    const validLoginCopy = { ...validLogin };
    validLoginCopy.password = 'password01';
    await expect(validateLogin(validLoginCopy)).rejects.toThrow('Password must contain upper case letters');
  });
  test('Password for login must contain numbers', async () => {
    const validLoginCopy = { ...validLogin };
    validLoginCopy.password = 'Password';
    await expect(validateLogin(validLoginCopy)).rejects.toThrow('Password must contain numbers');
  });
  test('function for login returns credentials if they were valid', async () => {
    await expect(validateLogin(validLogin)).resolves.toEqual(validLogin);
  });
});
