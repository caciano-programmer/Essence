import request from 'supertest';
import app from '../../../../server/app/app';

describe('tests for github oauth route oauth/github', () => {
  test('api should respond with redirect url and status code 200', async () => {
    const response = await request(app).get('/oauth/github');
    expect(response.statusCode).toBe(200);
    expect(response.body.url).toBeDefined();
  });
  test('should throw error if correct state is not present', async () => {
    const badState = 'invalid state for testing purposes';
    const response = await request(app)
      .get('/oauth/github/response')
      .query({ state: badState });
    expect(response.status).toBe(500);
  });
});
