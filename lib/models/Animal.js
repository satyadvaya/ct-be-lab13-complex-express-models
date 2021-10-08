const pool = require('../utils/pool.js');

module.exports = class Animal {
  id;
  animalName;
  speciesId;
  speciesType;

  constructor(row) {
    this.id = row.id;
    this.animalName = row.animal_name;
    this.speciesId = row.species_id;
    this.speciesType = row.species_type;
  }

  static async insert({ animalName, speciesId }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (animal_name, species_id) VALUES ($1, $2) RETURNING *',
      [animalName, speciesId]
    );
    return new Animal(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM animals');
    return rows.map((row) => {
      return new Animal(row);
    });
  }

  static async getAnimal(id) {
    const { rows } = await pool.query('SELECT * FROM animals WHERE id = ($1)', [
      id,
    ]);
    return new Animal(rows[0]);
  }
};
