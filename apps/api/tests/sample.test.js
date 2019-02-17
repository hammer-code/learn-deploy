const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});
const db = require('../src/db');
const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

beforeAll(async () => {
  try {
    await db.connect();
  } catch (error) {
    throw error
  }
});

afterAll(() => {
  db.disconnect();
});

test('GET /api/events should return 200', (done) => {
  request
    .get('/api/events')
    .then((response) => {
      expect(response.status).toBe(200);

      done();
    });
});
