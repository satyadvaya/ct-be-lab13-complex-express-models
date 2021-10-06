const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const animal = await Animal.insert(req.body);
      res.send(animal);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const animals = await Animal.getAll(req.body);
      res.send(animals);
    } catch (error) {
      next(error);
    }
  });
