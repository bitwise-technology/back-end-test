import { startDatabase } from './server/database';
import startServer from './server/routes';

startDatabase();
startServer();
