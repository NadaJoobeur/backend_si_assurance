import express from 'express';
import personneRoutes from '../modules/Personne/personne.routes.js'

import userRoutes from '../modules/user/user.routes.js';
import contratRoutes from "../modules/contrat/contrat.routes.js"


const router = express.Router();
router.use('/auth', userRoutes)
router.use('/personnes', personneRoutes )
router.use('/contrats', contratRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client

export default router;