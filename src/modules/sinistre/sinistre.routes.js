import express from 'express';
import {
  fetchAddSinistre,
  fetchListSinistre,
  fetchDeleteSinistre,
  fetchDetailSinistre,
  fetchUpdateSinistre,
  fetchSinistres,fetchReglements,listGarantiesSinistre,getListeStatuts,fetchSinistresParProduit,getTimeline,
} from './sinistre.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router()
router.use(authMiddleware); 
/*Pour le front  */
router.post('/addSinistre',authMiddleware, fetchAddSinistre)
router.get('/listSinistres',authMiddleware, fetchListSinistre)
router.delete('/DeleteSinistre/:numeroSinistre',authMiddleware,fetchDeleteSinistre)
router.get('/:numeroSinistre/details', authMiddleware, fetchDetailSinistre)
router.patch('/UpdateSinistre/:numeroSinistre', authMiddleware, fetchUpdateSinistre)

//Nada
router.get('/statuts', getListeStatuts); // ✅ FIXE EN PREMIER
router.get('/:numeroSinistre/reglements', fetchReglements);
router.get('/:numeroSinistre/garanties', listGarantiesSinistre);
router.get('/:identifiantClient', fetchSinistres);   // ✅ DYNAMIQUE EN DERNIER
router.get('/:identifiantPrincipal', fetchSinistresParProduit);
router.get('/:numeroSinistre/timelines', getTimeline);

export default router;
