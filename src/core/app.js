import express from "express";
import cors from "cors";
import morgan from 'morgan';
import routes from './routes.js'
import errorHandler from '../middlewares/errorHandler.js'
import {setupSwagger} from "./swagger.js";


const app = express();

app.use(cors({
  origin: 'hhtp://localhost/1173',  // adresse de ton frontend React
  credentials: true,                // autorise l'envoi des cookies ou tokens
}));
app.use(cors({
  origin: 'http://localhost:5173',  // adresse de ton frontend React
  credentials: true,                // autorise l'envoi des cookies ou tokens
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

// gestion des erreurs
app.use(errorHandler);

// Configuration Swagger
setupSwagger(app);

export default app;
