// src/modules/agence/agence.routes.js
import express from 'express';
import { getAgencesClient } from './agence.controller.js';

const router = express.Router();

router.get('/:numeroIdentifiant/ListAgencesParClient', getAgencesClient);

export default router;
