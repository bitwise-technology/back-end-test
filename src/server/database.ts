import { Pool } from 'pg';
import { isNumeric, usernameValidationRegex } from '../common/utils';

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

/**
 * Retorna um pool de conexoes ao DB
 * @returns pool de conexões
 */
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

/**
 * Inicia o banco de dados com as instruções create necessárias
 */
function startDatabase() {
  getClient()
    .query(userCreateTableQuery)
    .then(_ => console.log('Create table successfull'))
    .catch(err => console.log('Create table failed', err));
}

/**
 * Retorna a lista de todos os usuários, com suporte a paginação
 * @returns rows do DB com os dados
 */
async function getUsuarios(limit: number | undefined, start: number | undefined) {
  const values = await getClient().query('SELECT * from usuario limit $1 offset $2', [
    limit || 1000,
    start || 0
  ]);

  return values;
}

/**
 * Busca por um usuário pelo username
 * @param username username do usuário procurado
 * @returns dados do usuário em questão, ou null caso não encontrado
 */
async function getUsuario(username: string) {
  const value = await getClient().query('select * from usuario where usuario.username like $1', [
    username
  ]);

  if (value.rowCount == 0) return null;
  else return value;
}

export { startDatabase, getClient, getUsuarios, getUsuario };
