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
  position point 
);

CREATE TABLE weekdays (
  id serial NOT NULL PRIMARY KEY,
  day VARCHAR(10)
);

CREATE TABLE restosched (
  rest_id INTEGER REFERENCES restaurants(id),
  week_day_id INTEGER REFERENCES weekdays(id),
  open_time INTEGER,
  close_time INTEGER
);

CREATE UNIQUE INDEX place_id ON restaurants(place_id);
CREATE UNIQUE INDEX id ON weekdays(id);
CREATE INDEX rest_id ON restosched(rest_id);

