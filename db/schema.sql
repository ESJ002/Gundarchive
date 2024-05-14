CREATE DATABASE gundarchive;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username TEXT UNIQUE,
password_digest TEXT,
is_admin BOOLEAN
);

CREATE TABLE kits (
id SERIAL PRIMARY KEY,
name TEXT,
grade_id INTEGER NOT NULL,
series_id INTEGER NOT NULL,
date DATE,
SKU TEXT,
image_url TEXT,
FOREIGN KEY (grade_id) REFERENCES grades (id) ON DELETE CASCADE ,
FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE
);


/* Cannot add multiple kits of the same type */
create TABLE favourites (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (kit_id) REFERENCES kits (id) ON DELETE CASCADE 
)

/* Can add multiple kits of the same type */
create TABLE backlog (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (kit_id) REFERENCES kits (id) ON DELETE CASCADE 
)

/* Can add multiple kits of the same type */
create TABLE completed (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (kit_id) REFERENCES kits (id) ON DELETE CASCADE 
)

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    review_body TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE
)

CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    short_name TEXT,
    logo_url TEXT
)

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    abbreviation TEXT,
    logo_url TEXT
);

INSERT INTO series (full_name, short_name, logo_url)
VALUES ('Mobile Suit Gundam The Witch from Mercury', 'Witch from Mercury', 'https://upload.wikimedia.org/wikipedia/commons/8/87/Mobile_Suit_Gundam_The_Witch_from_Mercury_-_Japanese_logo.png');

INSERT INTO grades (full_name, abbreviation, logo_url)
VALUES ('Real Grade', 'RG', 'https://static.wikia.nocookie.net/gundam/images/9/93/RGlogo.jpg/revision/latest?cb=20150702112944')