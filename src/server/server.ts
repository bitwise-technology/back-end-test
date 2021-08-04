import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getClient, getUsuario, getUsuarios } from './database';
import { isNumeric, usernameValidationRegex } from '../common/utils';

// Setup do app express

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas

app.get('/', (req, res) => {
  res.send('Hello world! Servidor em funcionamento!');
});

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

    res.send(values.rows);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  if (!username.match(usernameValidationRegex)) return res.status(400).send('invalid username');

  const values = await getUsuario(username);

  if (values == null) res.send();
});

function startServer() {
  app.listen(5000, () => {
    console.log('Server started, listening at port 5000...');
  });
}

export default startServer;
