DROP DATABASE wegot_sidebar;

CREATE DATABASE wegot_sidebar;

\c wegot_sidebar;

CREATE TABLE restaurants (
  id serial NOT NULL PRIMARY KEY,
  place_id serial NOT NULL,
  place_name VARCHAR(50),
  formatted_address VARCHAR(150),
  international_phone_number VARCHAR(30),
  email VARCHAR(100),
  website VARCHAR(200),
  open_now boolean,
  mon_open INTEGER,
  mon_close INTEGER,
  tue_open INTEGER,
  tue_close INTEGER,
  wed_open INTEGER,
  wed_close INTEGER,
  thu_open INTEGER,
  thu_close INTEGER,
  fri_open INTEGER,
  fri_close INTEGER,
  sat_open INTEGER,
  sat_close INTEGER,
  sun_open INTEGER,
  sun_close INTEGER,
  position point 
);

CREATE UNIQUE INDEX place_id ON restaurants(place_id);

-- THE BELOW TABLES ARE FOR REFACTORING AFTER INCORPORATION OF A SIGLE, SIMPLE FLATTENED TABLE

-- CREATE TABLE week_days (
--   id serial NOT NULL,
--   day TEXT,
-- );

-- CREATE TABLE military_time (
--   id serial NOT NULL,
--   h24_interval VARCHAR(5)
-- );

-- CREATE TABLE resto_sched (
--   place_id INTEGER REFERENCES restaurants(id),
--   week_day_id INTEGER REFERENCES week_days(id),
--   open_time INTEGER REFERENCES military_time(id),
--   close_time INTEGER REFERENCES military_time(id)
-- );
