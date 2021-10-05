const { Router } = require('express');
const Species = require('../models/Species');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const insert = await Species.insert(req.body);
    res.send(insert);
  } catch (error) {
    next(error);
  }
});
