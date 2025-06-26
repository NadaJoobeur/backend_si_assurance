// src/modules/contrat/contrat.routes.js
import express from 'express';
import { fetchContratsClient,fetchProduitsClient, fetchGarantiesContrat, fetchVehiculeParContrat ,fetchAddContrat,fetchListContrat,fetchDeleteContrat,fetchDtailContrat,fetchUpdateContrat} from './contrat.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
const router = express.Router();

// 🔐 Protéger toutes les routes du module contrat
router.use(authMiddleware); 
/*Pour le front  */
router.post('/addContrat',authMiddleware, fetchAddContrat);
router.get('/listContrat/:ownerId',authMiddleware, fetchListContrat);
router.delete('/DeleteContrat/:numeroContrat',authMiddleware,fetchDeleteContrat),
router.get('/:numeroContrat/details',authMiddleware,fetchDtailContrat),
router.patch('/UpdateContrat/:numeroContrat',authMiddleware,fetchUpdateContrat),

/*specifiaction*/
router.get('/:numeroIdentification/contrats-client',authMiddleware, fetchContratsClient);
router.get('/:numeroIdentification/produits', fetchProduitsClient);
router.get('/:numeroIdentifiant/garanties', fetchGarantiesContrat);
router.get('/:numeroContrat/profils', fetchVehiculeParContrat);


export default router;

