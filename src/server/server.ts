import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getClient } from './database';

// Setup do app express

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas

app.get('/', (req, res) => {
  res.send('Hello world! Servidor em funcionamento!');
});

app.get('/user/all', async (req, res) => {
  const values = await getClient().query('SELECT * from user');

  res.send(values.rows);
});

function startServer() {
  app.listen(5000, () => {
    console.log('Server started, listening at port 5000...');
  });
}

export default startServer;
