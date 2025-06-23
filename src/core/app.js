import express from "express";
import cors from "cors";
import morgan from 'morgan';
import setupSwagger from './swagger.js';
import routes from './routes.js'
import errorHandler from '../middlewares/errorHandler.js'
import { swaggerUiMiddleware, swaggerUiHandler } from './swagger.js'


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
// Documentation Swagger à la racine /api-docs
app.use('/api-docs', swaggerUiMiddleware, swaggerUiHandler)

// gestion des erreurs
app.use(errorHandler);

// Configuration Swagger
setupSwagger(app);

export default app;
