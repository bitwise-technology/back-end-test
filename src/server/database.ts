import { Pool } from 'pg';

import keys from './keys';

// Setup do cliente postgres

// query para criação da tabela 'usuario'
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
let pool: Pool;

function getClient() {
  if (pool == null) {
    pool = new Pool({
      user: keys.pgUser,
      host: keys.pgHost,
      database: keys.pgDatabase,
      password: keys.pgPassword,
      port: parseInt(keys.pgPort!)
    });
    pool.on('error', () => console.log('Lost PG connection'));
  }

  return pool;
}

// cria o pool de conexões e gera a tabela
function startDatabase() {
  getClient()
    .query(userCreateTableQuery)
    .then(_ => console.log('Create table successfull'))
    .catch(err => console.log('Create table failed', err));
}

export { startDatabase, getClient };
