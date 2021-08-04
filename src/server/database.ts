import { Pool } from 'pg';
import ApiUser, { Gender } from '../model/ApiUser';

import keys from './keys';
import testUserList from '../common/test-users.json';

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
  email varchar unique,
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
    .then(_ => {
      console.log('Create table successfull');
      testUserList.users.forEach(user => {
        insertUsuario(
          new ApiUser(
            user.username,
            user.name,
            user.lastName,
            user.profileImageUrl,
            user.email,
            user.bio,
            user.gender as Gender
          )
        );
        console.log(`usuario ${user.username} inserido com sucesso`);
      });
    })
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
  const value = await getClient().query('select * from usuario where usuario.username=$1', [
    username
  ]);

  if (value.rowCount == 0) return null;
  else return value;
}

/**
 * Insere um novo usuário no banco de dados
 *
 * @param usuario usuário a ser inserido
 */
async function insertUsuario(usuario: ApiUser) {
  const result = await getClient().query(
    `
  insert into usuario(username, name, lastName, profileImageUrl, bio, email, gender)
  values ($1,$2,$3,$4,$5,$6,$7)
  `,
    [
      usuario.userName,
      usuario.name,
      usuario.lastName,
      usuario.profileImageUrl,
      usuario.bio,
      usuario.email,
      usuario.gender
    ]
  );

  return result;
}

/**
 * Atualiza informações de um usuário no banco de dados
 *
 * @param username username atual do usuário
 * @param usuario novos dados
 */
async function updateUsuario(username: string, usuario: ApiUser) {
  const result = await getClient().query(
    `
  update usuario set 
  username=$1, 
  name=$2, 
  lastName=$3, 
  profileImageUrl=$4, 
  bio=$5, 
  email=$6, 
  gender=$7
  where username=$8
  `,
    [
      usuario.userName,
      usuario.name,
      usuario.lastName,
      usuario.profileImageUrl,
      usuario.bio,
      usuario.email,
      usuario.gender,
      username
    ]
  );

  return result;
}

/**
 * Verifica a existência de um usuário dado seu username
 * @param username username do usuário
 * @returns true caso um usuário com o dado username já exista
 */
async function userExists(username: string) {
  const result = await getClient().query(
    `
    select u.username from usuario u where u.username = $1
  `,
    [username]
  );

  return result.rowCount;
}

/**
 * Verifica a existência de um usuário dado seu email
 * @param email email do usuário
 * @returns true caso um usuário com o dado email já exista
 */
async function emailExists(email: string, ignoreUser?: string) {
  const result = await getClient().query(
    `
    select u.email from usuario u where u.email = $1 
    ${ignoreUser ? ` and u.username!=$2` : ''}
  `,
    ignoreUser ? [email, ignoreUser] : [email]
  );

  return result.rowCount;
}

/**
 * Deleta um usuário do banco
 * @param username username do usuário a ser deletado
 * @returns dados do usuário deletado, ou vazio caso nenhuma mudança seja feita
 */
async function deleteUsuario(username: string) {
  const result = await getClient().query(
    `
    delete from usuario where username=$1
  `,
    [username]
  );

  return result
}

export {
  startDatabase,
  getClient,
  getUsuarios,
  getUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  userExists,
  emailExists
};
