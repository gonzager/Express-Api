
CREATE TABLE usuario
(
    ID SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    edad integer NOT NULL,
    tiene_registro boolean NOT NULL DEFAULT false
)