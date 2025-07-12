// src/modules/devis/devis.routes.js

import express from 'express';
import { getPackGaranties,getGenresVehicule,getDecompteDevis,fetchAddDevis ,fetchListDevis,fetchDeleteDevis,fetchDtailDevis,fetchUpdateDevis,fetchCreateContrat} from '../devis/devis.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';


const router = express.Router();

// 🔐 Protéger toutes les routes du module contrat
router.use(authMiddleware); 

/*Pour le front  */
router.post('/addDevis',authMiddleware, fetchAddDevis);
router.get('/listDevis',authMiddleware, fetchListDevis);
router.delete('/DeleteDevis/:id_devis',authMiddleware,fetchDeleteDevis),
router.get('/:id_devis/details',authMiddleware,fetchDtailDevis),
router.patch('/UpdateDevis/:id_devis',authMiddleware,fetchUpdateDevis),
router.patch('/contratFromDevis/:id_devis',authMiddleware,fetchCreateContrat),


// POST /contrats/:numeroContrat/parametres-generaux/pack-garanties
router.post('/:numeroContrat/parametres-generaux/pack-garanties', getPackGaranties);
router.post('/decompte', getDecompteDevis);
router.get('/genresVehicule', getGenresVehicule);

export default router;
