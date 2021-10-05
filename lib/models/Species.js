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
};
