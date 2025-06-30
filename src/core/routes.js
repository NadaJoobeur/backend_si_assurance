import express from 'express';
import personneRoutes from '../modules/Personne/personne.routes.js'

import userRoutes from '../modules/user/user.routes.js';
import contratRoutes from "../modules/contrat/contrat.routes.js"
import devisRoutes from "../modules/devis/devis.routes.js";
import agenceRoutes from '../modules/agence/agence.routes.js';


const router = express.Router();
router.use('/auth', userRoutes)
router.use('/personnes', personneRoutes )
router.use('/contrats', contratRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client
router.use('/devis', devisRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client
router.use('/agence', agenceRoutes);


export default router;
