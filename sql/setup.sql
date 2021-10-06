DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species_type TEXT NOT NULL,
    extinct BOOLEAN
);

INSERT INTO species (species_type, extinct)
VALUES ('Fish', false),
    ('Amphibian', false),
    ('Reptile', false),
    ('Bird', false),
    ('Thylacine', true);

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    animal_name TEXT NOT NULL,
    species_id BIGINT NOT NULL,
    FOREIGN KEY(species_id) REFERENCES species(id)
);

INSERT INTO animals (animal_name, species_id)
VALUES ('Tuna', '1'),
    ('Salamander', '2'),
    ('Anaconda', '3'),
    ('Ostrich', '4'),
    ('Thylacine', '5');
