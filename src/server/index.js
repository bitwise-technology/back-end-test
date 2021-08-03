import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { Pool } from 'pg';

import keys from './keys';

// Express App Setup

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup

const userCreateTableQuery = fs.readFileSync('../model/usuario-create-table.sql').toString();

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
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

app.listen(5000, err => {
  console.log('Server started');
});
