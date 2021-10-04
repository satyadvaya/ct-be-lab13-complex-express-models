const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new species', () => {
    const newSpecies = {
      type: 'Lorax',
      extinct: false,
    };
    return request(app)
      .post('api/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({ ...newSpecies, id: '6' });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
