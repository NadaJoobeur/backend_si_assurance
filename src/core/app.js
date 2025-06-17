import express from "express";
import cors from "cors";
import morgan from 'morgan';
import routes from './routes.js'
import errorHandler from '../middlewares/errorHandler.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);

// gestion des erreurs
app.use(errorHandler);

export default app;
