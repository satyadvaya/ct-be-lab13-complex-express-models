const { Router } = require('express');
const Species = require('../models/Species');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const species = await Species.insert(req.body);
      res.json(species);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const species = await Species.getAll(req.body);
      res.json(species);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const extinct = req.body.extinct;
      const species = await Species.patchSpecies(id, extinct);
      res.json(species);
    } catch (err) {
      next(err);
    }
  });
