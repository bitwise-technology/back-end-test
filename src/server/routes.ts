import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  deleteUsuario,
  emailExists,
  getClient,
  getUsuario,
  getUsuarios,
  insertUsuario,
  updateUsuario,
  userExists
} from './database';
import { generateUsernames, isNumeric, usernameValidationRegex } from '../common/utils';
import ApiUser from '../model/ApiUser';
import { buildUsuario } from '../controller/usuarioBuilder';
import ApiError from '../model/ApiError';
import { getUser } from '../client';

// Setup do app express

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas

// Raiz
app.get('/', (req, res) => {
  res.send('Hello world! Servidor em funcionamento!');
});

// Listar todos os usuários, com paginação
app.get('/user', async (req, res) => {
  try {
    const { limit, start } = req.query;

    let parseLimit, parseStart;

    if (limit != null)
      if (!isNumeric(limit)) return res.status(400).send('limit must be a numbers');
      else parseLimit = parseInt(limit as string);

    if (start != null) {
      if (!isNumeric(start)) return res.status(400).send('start must be a number');
      else parseStart = parseInt(start as string);
    }

    const values = await getUsuarios(parseLimit, parseStart);

    res.send({
      result: values.rows
    });
  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
});

// Listar usuário por username
app.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  if (!username.match(usernameValidationRegex)) return res.status(400).send('invalid username');

  const values = await getUsuario(username);

  if (values == null) res.status(204).send();
  else
    res.send({
      result: values.rows[0]
    });
});

// Inserir usuário
app.post('/user/', async (req, res) => {
  try {
    let { username, name, lastName, profileImageUrl, email, bio, gender } = req.body.user;

    let novoUsuario: ApiUser;

    const { github } = req.query;
    if (github) {
      const githubUser = await getUser(username);
      if (githubUser == null) {
        return res.status(404).send({
          message: 'github user not found',
          suggestedNames: generateUsernames(username)
        });
      } else novoUsuario = ApiUser.fromGithub(githubUser);
    } else {
      novoUsuario = buildUsuario(username, name, lastName, profileImageUrl, email, bio, gender);
    }

    let exists = await userExists(username);

    if (exists) throw new ApiError(400, 'username already being used');

    exists = await emailExists(email);

    if (exists) throw new ApiError(400, 'email already being used');

    const result = await insertUsuario(novoUsuario);

    return result.rowCount > 0
      ? res.status(200).send({
          user: novoUsuario
        })
      : res.status(204).send();
  } catch (e) {
    if (e instanceof ApiError) {
      return res.status(e.status).send({
        message: e.message
      });
    } else {
      return res.status(500).send({
        message: e.message
      });
    }
  }
});

// Atualizar usuário
app.put('/user/:username', async (req, res) => {
  try {
    const { username, name, lastName, profileImageUrl, email, bio, gender } = req.body.user;

    const oldUsername = req.params.username;

    const novoUsuario = buildUsuario(username, name, lastName, profileImageUrl, email, bio, gender);

    if (!oldUsername.match(usernameValidationRegex))
      return res.status(400).send('invalid username');

    let exists = await userExists(oldUsername);
    if (exists == 0) throw new ApiError(400, 'user not found');

    if (username != oldUsername) {
      exists = await userExists(username);
      if (exists > 0) throw new ApiError(400, 'username already in use');
    }

    exists = await emailExists(email, oldUsername);
    if (exists > 0) throw new ApiError(400, 'email already in use');

    const result = await updateUsuario(oldUsername, novoUsuario);

    return result.rowCount > 0
      ? res.status(200).send({
          user: novoUsuario
        })
      : res.status(204).send();
  } catch (e) {
    if (e instanceof ApiError) {
      return res.status(e.status).send({
        message: e.message
      });
    } else {
      return res.status(500).send({
        message: e.message
      });
    }
  }
});

app.delete('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    if (!username.match(usernameValidationRegex)) return res.status(400).send('invalid username');

    const result = await deleteUsuario(username);
    if (result.rowCount > 0) return res.send(result.rows[0]);
    else return res.status(204).send();
  } catch (e) {
    if (e instanceof ApiError) {
      return res.status(e.status).send({
        message: e.message
      });
    } else {
      return res.status(500).send({
        message: e.message
      });
    }
  }
});

app.all('*', async (req, res) => {
  return res.status(404).send({
    message: 'resource not found'
  });
});

function startServer() {
  app.listen(5000, () => {
    console.log('Server started, listening at port 5000...');
  });
}

export default startServer;
