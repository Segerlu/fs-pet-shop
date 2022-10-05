DROP TABLE IF EXISTS pets CASCADE;

CREATE TABLE pets (
    pets_id     serial,
    pets_age    integer,
    pets_kind   varchar(50),
    pets_name   varchar(20)
);


INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (5, 'butterfly', 'butterfree');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (2, 'dog', 'finch');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (8, 'cat', 'bucky');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (4, 'groundhog', 'scardy');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (5, 'fly', 'dumb');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (6, 'rock', 'smellwhatimcookin');

INSERT INTO pets (pets_age, pets_kind, pets_name) 
VALUES (2, 'ferret', 'smelly');