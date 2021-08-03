import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

import keys from './server/keys';

// Express App Setup

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup

const userCreateTableQuery = `
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
  username varchar not null primary key,
  name varchar not null,
  lastName varchar,
  profileImageUrl varchar,
  bio varchar,
  email varchar,
  gender varchar
);
`;

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: parseInt(keys.pgPort!)
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query(userCreateTableQuery)
  .then(_ => console.log('Create table successfull'))
  .catch(err => console.log('Create table failed', err));

// Express route handlers

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/user/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from user');

  res.send(values.rows);
});

app.listen(5000, () => {
  console.log('Server started, listening at port 5000...');
});
