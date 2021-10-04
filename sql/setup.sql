DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
    type TEXT NOT NULL UNIQUE,
    extinct BOOLEAN
);

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    species_id BIGINT NOT NULL,
    FOREIGN KEY(species_id) REFERENCES species(id) ON DELETE CASCADE
);

INSERT INTO species (type, extinct)
VALUES ('Fish', false),
    ('Amphibian', false),
    ('Reptile', false),
    ('Bird', false),
    ('Thylacine', true);

INSERT INTO animals (name, species_id)
VALUES ('Tuna', 1),
    ('Salamander', 2),
    ('Anaconda', 3),
    ('Ostrich', 4),
    ('Thylacine', 5);
    