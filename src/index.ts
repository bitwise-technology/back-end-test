import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes/routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())

    app.use(routes);

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app.listen(process.env.PORT);
    
})