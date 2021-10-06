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

  .get('/', async (req, res, next) => {
    try {
      const animals = await Animal.getAll(req.body);
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
  });
