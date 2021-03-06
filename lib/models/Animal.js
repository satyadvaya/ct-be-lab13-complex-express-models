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
      `INSERT INTO animals
        (animal_name,
        species_id)
      VALUES ($1, $2)
      RETURNING *`,
      [animalName, speciesId]
    );
    return new Animal(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT *
      FROM animals`
    );
    return rows.map((row) => {
      return new Animal(row);
    });
  }

  static async getAnimal(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM animals
      WHERE id = ($1)`,
      [id]
    );
    return new Animal(rows[0]);
  }

  static async getSpecies() {
    const { rows } = await pool.query(
      `SELECT
        animals.animal_name,
        species.species_type
      FROM animals
      LEFT JOIN species
      ON animals.species_id = species.id`
    );
    return rows.map((row) => {
      return new Animal(row);
    });
  }

  static async patchAnimal(id, animalName) {
    const { rows } = await pool.query(
      `UPDATE animals
      SET animal_name = ($2)
      WHERE id = ($1)
      RETURNING *`,
      [id, animalName]
    );
    return new Animal(rows[0]);
  }

  static async deleteAnimal(id) {
    const { rows } = await pool.query(
      `DELETE FROM animals
      WHERE id = ($1)
      RETURNING *`,
      [id]
    );
    return new Animal(rows[0]);
  }

  static async countAnimals() {
    const { rows } = await pool.query(
      `SELECT
        species.species_type,
        COUNT(animals.species_id)
      FROM species
      INNER JOIN animals
      ON species.id = animals.species_id
      GROUP BY species.species_type
      ORDER BY
        species.species_type`
    );
    return rows;
  }
};
