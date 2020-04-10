import request from 'supertest';
import app from '../../../server/app/app';
import { initDB as db } from '../../../server/db/dbConfig';
import { createUser } from '../../../server/db/queries/auth/account';

// base64 encoded for testing@test.com:Password01
const goodCredentials = 'dGVzdGluZ0B0ZXN0LmNvbTpQYXNzd29yZDAx';
const validProfileBody = { name: 'Bob', confirm: 'testing@test.com' };
const user = { email: 'testing@test.com', name: 'test-user', password: 'Password01' };

afterAll(async () => {
  await db.destroy();
});

describe('Tests for signup endpoint:', () => {
  test('throws error if credentials in header missing', async () => {
    const response = await request(app)
      .post('/signup')
      .send(validProfileBody);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ Error: 'Send Credentials in proper format' });
  });
  test('throws error if profile missing', async () => {
    const response = await request(app)
      .post('/signup')
      .set('Authorization', `Basic ${goodCredentials}`);
    expect(response.status).toBe(500);
    expect(response.body.Error).not.toBeNull();
  });
  test('throws error if email already exists', async () => {
    await createUser(user);
    const response = await request(app)
      .post('/signup')
      .set('Authorization', `Basic ${goodCredentials}`)
      .send(validProfileBody);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ Error: 'Email already exist' });
    await db('Users').del();
  });
  test('should set cookies, create user, and give status 200 if valid credentials and email is new', async () => {
    const response = await request(app)
      .post('/signup')
      .send(validProfileBody)
      .set('Authorization', `Basic ${goodCredentials}`);
    const cookies = response.headers['set-cookie'].flatMap(cookie => cookie.split('=', 1));
    const newInsertedUser = await db
      .select()
      .from('Users')
      .where({ email: user.email });
    expect(response.status).toBe(200);
    expect(cookies).toContain('jwt');
    expect(cookies).toContain('csrf');
    expect(newInsertedUser.length).toBe(1);
    await db('Users').del();
  });
});
