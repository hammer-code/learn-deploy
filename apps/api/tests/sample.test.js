const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});
const db = require('../src/db');
const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

let connection = null;

beforeAll(async () => {
  connection = await db.connect();
});

afterAll(() => {
  connection.disconnect();
  // db.disconnect(connection);
});

test('GET /api/events should return 200', (done) => {
  request
    .get('/api/events')
    .then((response) => {
      expect(response.status).toBe(200);

      done();
    });
});
