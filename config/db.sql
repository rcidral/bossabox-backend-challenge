-- create tools table --
CREATE TABLE tools (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags VARCHAR(255)[] NOT NULL
);