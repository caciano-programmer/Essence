import request from 'supertest';
import app from '../../../server/app/app';
import { initDB as db } from '../../../server/db/dbConfig';
import { createUser } from '../../../server/db/queries/auth/account';

// the user we will validate against
const user = { email: 'testing@test.com', name: 'test-user', password: 'Password01' };

beforeAll(async () => {
  await createUser(user);
});

afterAll(async () => {
  await db('Users').del();
  await db.destroy();
});

describe('test suite for login api endpoint', () => {
  test('login responds with error code if no credentials passed', async () => {
    const response = await request(app).post('/login');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ Error: 'Send Credentials in proper format' });
  });
  test('should throw error if email doesnt exist', async () => {
    // base64 encoded for foo@bar.com:Password01
    const badCredentials = 'Zm9vQGJhci5jb206UGFzc3dvcmQwMQ==';
    const response = await request(app)
      .post('/login')
      .set('Authorization', `Basic ${badCredentials}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ Error: 'Email does not exist, plase check spelling' });
  });
  test('should throw error if password is incorrect', async () => {
    // base64 encoded for testing@test.com:BadPassword01
    const badCredentials = 'dGVzdGluZ0B0ZXN0LmNvbTpCYWRQYXNzd29yZDAx';
    const response = await request(app)
      .post('/login')
      .set('Authorization', `Basic ${badCredentials}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ Error: 'Password is incorrect, please try again' });
  });
  test('test should succeed with status code 200 and return cookies, due to valid credentials', async () => {
    // base64 encoded for testing@test.com:Password01
    const goodCredentials = 'dGVzdGluZ0B0ZXN0LmNvbTpQYXNzd29yZDAx';
    const response = await request(app)
      .post('/login')
      .set('Authorization', `Basic ${goodCredentials}`);
    const cookies = response.headers['set-cookie'].flatMap(cookie => cookie.split('=', 1));
    expect(cookies).toContain('jwt');
    expect(cookies).toContain('csrfToken');
    expect(response.status).toBe(200);
  });
});
