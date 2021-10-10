const pool = require('../utils/pool.js');

module.exports = class Species {
  id;
  speciesType;
  extinct;

  constructor(row) {
    this.id = row.id;
    this.speciesType = row.species_type;
    this.extinct = row.extinct;
  }

  static async insert({ speciesType, extinct }) {
    const { rows } = await pool.query(
      'INSERT INTO species (species_type, extinct) VALUES ($1, $2) RETURNING *',
      [speciesType, extinct]
    );
    return new Species(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM species');
    return rows.map((row) => {
      return new Species(row);
    });
  }

  static async patchSpecies(id, extinct) {
    const { rows } = await pool.query(
      `UPDATE species
      SET extinct = ($2)
      WHERE id = ($1)
      RETURNING *`,
      [id, extinct]
    );
    return new Species(rows[0]);
  }
};
