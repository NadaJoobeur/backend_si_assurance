import express from "express";
import cors from "cors";
import morgan from 'morgan';
import routes from './routes.js'
import errorHandler from '../middlewares/errorHandler.js'
import {setupSwagger} from "./swagger.js";


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);

// gestion des erreurs
app.use(errorHandler);

// Configuration Swagger
setupSwagger(app);

export default app;
