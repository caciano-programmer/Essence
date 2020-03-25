import request from 'supertest';
import app from '../../../../server/app/app';

describe('tests for github oauth route oauth/github', () => {
  test('api should respond with redirect and status code 301', async () => {
    const response = await request(app).get('/oauth/github');
    expect(response.status).toBe(302);
    expect(response.redirect).toBe(true);
  });
});
