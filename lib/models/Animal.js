const pool = require('../utils/pool.js');

module.exports = class Animal {
  id;
  animalName;
  speciesId;

  constructor(row) {
    this.id = row.id;
    this.animalName = row.animal_name;
    this.speciesId = row.species_id;
  }

  static async insert({ animalName, speciesId }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (animal_name, species_id) VALUES ($1, $2) RETURNING *',
      [animalName, speciesId]
    );
    return new Animal(rows[0]);
  }
};