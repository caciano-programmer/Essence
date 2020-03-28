import request from 'supertest';
import app from '../../../../server/app/app';

describe('test for google endpoint /oauth/google', () => {
  test('should respond with redirect url and respond with status code 302', async () => {
    const response = await request(app).get('/oauth/google');
    expect(response.status).toBe(302);
    expect(response.redirect).toBe(true);
  });
});

describe('test for route /oauth/google/response', () => {
  test('should throw error if no query params present', async () => {
    const response = await request(app).get('/oauth/google/response');
    const { Error } = JSON.parse(response.text);
    expect(response.status).toBe(500);
    expect(Error).toMatch('Google authentication failed, please try logging in again');
  });
});
