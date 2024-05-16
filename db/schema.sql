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
sku TEXT,
image_url TEXT,
FOREIGN KEY (grade_id) REFERENCES grades (id) ON DELETE CASCADE ,
FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE
);


/* Cannot add multiple kits of the same type */
create TABLE favourites (
    id SERIAL PRIMARY KEY,
    fav_user_id INTEGER NOT NULL,
    fav_kit_id INTEGER NOT NULL,
    FOREIGN KEY (fav_user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (fav_kit_id) REFERENCES kits (id) ON DELETE CASCADE 
);

/* Can add multiple kits of the same type */
create TABLE backlog (
    id SERIAL PRIMARY KEY,
    back_user_id INTEGER NOT NULL,
    back_kit_id INTEGER NOT NULL,
    FOREIGN KEY (back_user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (back_kit_id) REFERENCES kits (id) ON DELETE CASCADE 
);

/* Can add multiple kits of the same type */
create TABLE completed (
    id SERIAL PRIMARY KEY,
    comp_user_id INTEGER NOT NULL,
    comp_kit_id INTEGER NOT NULL,
    FOREIGN KEY (comp_user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (comp_kit_id) REFERENCES kits (id) ON DELETE CASCADE 
);

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


SELECT 
    favourites.fav_kit_id,
    kits.id, 
    kits.name, 
    grade_id, 
    series_id,
    date,
    sku,
    kits.image_url, 
    series.logo_url series_logo,
    grades.logo_url grades_logo,
    grades.abbreviation grades_abbreviation
       FROM 
    favourites
    JOIN kits
    ON (favourites.fav_kit_id = kits.id)
    JOIN
    series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)

    WHERE favourites.fav_user_id = $1

    ORDER BY favourites.id desc;

update kits set image_url = 'https://www.rhyplabuilds.com.au/assets/full/G5061582.jpg?20211119120516' where sku = 'G5061582';

INSERT INTO series (full_name, short_name, logo_url)
VALUES 
('Mobile Suit Gundam', 'Mobile Suit Gundam', 'https://seeklogo.com/images/G/gundam-mobile-suit-logo-24FFDD2BAD-seeklogo.com.png'),
('Mobile Suit Gundam Seed', 'Seed', 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUCTRBXZCMYtlz6TQUhRZj_F7OJT9_S2ZaA2ytr3eaPV4UoXXeSeWRn49F-GLjzYQnka_mK31VMZVreFGZYCc9s0uRDvs-lLnwPr139kz8uL.png?r=204'),
('Mobile Suit Gundam Seed Destiny', 'Seed Destiny', 'https://wiki.gbl.gg/images/thumb/f/fb/GSD-logo.png/400px-GSD-logo.png'),
('Mobile Suit Gundam Iron-Blooded Orphans', 'Iron-Blooded Orphans', 'https://wiki.gbl.gg/images/thumb/f/fb/GSD-logo.png/400px-GSD-logo.png'),
('Mobile Suit Gundam The Witch From Mercury', 'Witch From Mercury', 'https://en.gundam.info/about-gundam/series-pages/witch/shared/img/top/visual_logo4.png'),
('Mobile Suit Gundam Seed Freedom', 'Seed Freedom', 'https://en.gundam.info/about-gundam/series-pages/seedfreedom/img/common/logo/logo.png'),
('Neon Genesis Evangelion', 'Evangelion', 'https://static.wikia.nocookie.net/evangelion/images/d/db/Neon_Genesis_Evangelion_Logo_transparent.png');

INSERT INTO grades (full_name, abbreviation, logo_url)
VALUES ('High Grade', 'HG','https://static.wikia.nocookie.net/gunplabuilders/images/4/4a/HGlogo.jpg');

INSERT INTO grades (full_name, abbreviation, logo_url)
VALUES 
('High Grade', 'HG', 'https://gundamshoppersnetwork.com/cdn/shop/collections/high-grade-gunpla-logo_edit.jpg?v=1648176669'),
('Real Grade', 'RG', 'https://static.wikia.nocookie.net/gundam/images/9/93/RGlogo.jpg'),
('Master Grade', 'MG', 'https://static.wikia.nocookie.net/gundam/images/3/39/MGlogo.jpg'),
('Master Grade Ver Ka.','MG Ver Ka.','https://en.gundam.info/content/mgka/narrative/images/logoMgVerKa.png'),
('Full Mechanics','Full Mechanics','https://static.wikia.nocookie.net/gundam/images/b/b7/FullMechanicsLogo.jpg'),
('Master Grade Super Deformed','MGSD','https://en.gundam.info/content/mgsd/003/images/01aboutLogo.png'),
('Perfect Grade','PG','https://www.zonegunpla.com/cdn/shop/collections/menu_pg.png'),
('Super Deformed','SD','https://static.wikia.nocookie.net/gundam/images/e/e7/SDGundamEXStandard-Logo.png'),
('Entry Grade','EG','https://static.wikia.nocookie.net/gundam/images/3/32/EG_2020logo.png'),
('Figure-Rise Standard','Figure-Rise','https://rivalscorner.co.uk/cdn/shop/collections/Figure-rise_Standard_Logo_Stacked.png'),
('Master Grade Extreme', 'MGEX', 'https://en.gundam.info/content/mgex/strikefreedom/images/logoMGEX.png')
;

update kits set date = '2023-01-19' where sku = 'G5064257';