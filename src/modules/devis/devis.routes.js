// src/modules/devis/devis.routes.js

import express from 'express';
import { getPackGaranties,getDecompteDevis } from '../devis/devis.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

/*Pour le front  */
const router = express.Router();


// 🔐 Protéger toutes les routes du module contrat
router.use(authMiddleware); 

// POST /contrats/:numeroContrat/parametres-generaux/pack-garanties
router.post('/:numeroContrat/parametres-generaux/pack-garanties', getPackGaranties);
router.post('/decompte', getDecompteDevis);

export default router;
