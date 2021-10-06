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
          { id: expect.any(Number), speciesType: 'Fish', extinct: false },
          { id: expect.any(Number), speciesType: 'Amphibian', extinct: false },
          { id: expect.any(Number), speciesType: 'Reptile', extinct: false },
          { id: expect.any(Number), speciesType: 'Bird', extinct: false },
          { id: expect.any(Number), speciesType: 'Thylacine', extinct: true },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
