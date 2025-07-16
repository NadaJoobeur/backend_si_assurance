// src/modules/dashboard/dashboard.routes.js

import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import {fetchData} from "../dashboard/dashboard.controller.js";

const router = express.Router();

// 🔐 Protéger toutes les routes du module contrat
router.use(authMiddleware); 
router.get('/data',authMiddleware, fetchData);



export default router;
