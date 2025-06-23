// src/modules/contrat/contrat.routes.js
import express from 'express';
import { fetchContratsClient,fetchProduitsClient, fetchGarantiesContrat, fetchVehiculeParContrat } from './contrat.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
const router = express.Router();

// 🔐 Protéger toutes les routes du module contrat
router.use(authMiddleware); 

router.get('/:numeroIdentification/contrats-client',authMiddleware, fetchContratsClient);
router.get('/:numeroIdentification/produits', fetchProduitsClient);
router.get('/:numeroIdentifiant/garanties', fetchGarantiesContrat);
router.get('/:numeroContrat/profils', fetchVehiculeParContrat);


export default router;

