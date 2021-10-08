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

  it('should POST a new animal', () => {
    const newAnimal = {
      animalName: 'DoDo',
      speciesId: '4',
    };
    return request(app)
      .post('/api/animals')
      .send(newAnimal)
      .then((res) => {
        expect(res.body).toEqual({ ...newAnimal, id: '6' });
      });
  });

  it('should GET an animal by id', () => {
    return request(app)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animalName: 'Tuna',
          speciesId: '1',
        });
      });
  });

  it('should GET all animals and include their species', () => {
    return request(app)
      .get('/api/animals/')
      .then((res) => {
        expect(res.body).toEqual([
          { animalName: 'Tuna', speciesType: 'Fish' },
          {
            animalName: 'Salamander',
            speciesType: 'Amphibian',
          },
          {
            animalName: 'Anaconda',
            speciesType: 'Reptile',
          },
          {
            animalName: 'Ostrich',
            speciesType: 'Bird',
          },
          {
            animalName: 'Thylacine',
            speciesType: 'Thylacine',
          },
        ]);
      });
  });

  it('should PATCH an animal by id', () => {
    return request(app)
      .patch('/api/animals/1')
      .send({ animalName: 'Sea Chicken' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          animalName: 'Sea Chicken',
          speciesId: '1',
        });
      });
  });

  it('should DELETE an animal by id', () => {
    return request(app)
      .delete('/api/animals/2')
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          animalName: 'Salamander',
          speciesId: '2',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
