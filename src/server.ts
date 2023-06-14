import express from 'express';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';


const swaggerFile = readFileSync('./swagger.json', 'utf8');

const app = express();
app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerFile)));

app.listen(3333, () => console.log("Server is running in port 3333"));
