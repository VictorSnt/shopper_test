import express, { Application } from 'express';
import cors from 'cors';
import { router as measureRouter } from './adapters/routes/measurementRoutes';
import bodyParser from 'body-parser';
import { AppDataSource } from './adapters/config/data-source';

const app: Application = express();
const port: number = 3000;


AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((error) => {
  console.error('Error during Data Source initialization:', error);
});

app.use(cors()); 

app.use(bodyParser.json());
app.use('/', measureRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await AppDataSource.destroy();
  console.log('Data Source has been destroyed!');
  process.exit(0);
});