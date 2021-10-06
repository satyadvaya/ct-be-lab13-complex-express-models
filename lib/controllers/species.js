const { Router } = require('express');
const Species = require('../models/Species');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const species = await Species.insert(req.body);
      res.send(species);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const species = await Species.getAll(req.body);
      res.send(species);
    } catch (error) {
      next(error);
    }
  });
