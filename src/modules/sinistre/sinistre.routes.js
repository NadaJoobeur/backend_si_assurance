import express from 'express';
import {
  fetchAddSinistre,
  fetchListSinistre,
  fetchDeleteSinistre,
  fetchDetailSinistre,
  fetchUpdateSinistre,
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



export default router;
