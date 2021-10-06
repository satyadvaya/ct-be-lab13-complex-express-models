const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should POST a new species', () => {
    const newSpecies = {
      speciesType: 'Lorax',
      extinct: true,
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({ ...newSpecies, id: '6' });
      });
  });

  it('should GET all species', () => {
    return request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual([
          { id: '1', speciesType: 'Fish', extinct: false },
          { id: '2', speciesType: 'Amphibian', extinct: false },
          { id: '3', speciesType: 'Reptile', extinct: false },
          { id: '4', speciesType: 'Bird', extinct: false },
          { id: '5', speciesType: 'Thylacine', extinct: true },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
