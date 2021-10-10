const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const animal = await Animal.insert(req.body);
      res.json(animal);
    } catch (error) {
      next(error);
    }
  })

  .get('/species', async (req, res, next) => {
    try {
      const species = await Animal.getSpecies(req.body);
      res.json(species);
    } catch (error) {
      next(error);
    }
  })

  .get('/count', async (req, res, next) => {
    try {
      const animals = await Animal.countAnimals(req.body);
      res.json(animals);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animal.getAnimal(id);
      res.json(animal);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animalName = req.body.animalName;
      const animal = await Animal.patchAnimal(id, animalName);
      res.json(animal);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animal.deleteAnimal(id);
      res.json(animal);
    } catch (err) {
      next(err);
    }
  });
