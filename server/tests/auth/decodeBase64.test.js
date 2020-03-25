import { decode } from '../../server/auth/decodeBase64';

describe('test cases for decode function', () => {
  test('should throw error if parameter is not of type string', async () => {
    await expect(decode(12345)).rejects.toThrow('Send Credentials in proper format');
  });

  test('should throw error if splitting parameter does not return an array of length 2', async () => {
    await expect(decode('dummyString')).rejects.toThrow('Send Credentials in proper format');
  });

  test('should throw error if header not of type Basic', async () => {
    await expect(decode('dummy string')).rejects.toThrow('Send Credentials in proper format');
  });

  test('should throw error if decoded string contains more than 1 colon operator', async () => {
    // dGVzdDo6dGVzdA== is the encoded form of 'test::test'
    await expect(decode('Basic dGVzdDo6dGVzdA==')).rejects.toThrow('Send Credentials in proper format');
  });

  test('returns credentials if parameter is in proper format', async () => {
    // dGVzdDp0ZXN0 is encoded form of 'test:test'
    await expect(decode('Basic dGVzdDp0ZXN0')).resolves.toEqual(['test', 'test']);
  });
});
