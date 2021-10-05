const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new species', () => {
    const newSpecies = {
      speciesType: 'Lorax',
      extinct: true,
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual({ ...newSpecies, id: '6' });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
