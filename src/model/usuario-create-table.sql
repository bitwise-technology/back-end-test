DROP TABLE IF EXISTS user;
CREATE TABLE user(
  username varchar not null primary key,
  name varchar not null,
  lastName varchar,
  profileImageUrl varchar,
  bio varchar,
  email varchar,
  gender varchar
);
