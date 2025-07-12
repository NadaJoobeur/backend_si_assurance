// src/modules/paiement/paiement.routes.js
import express from 'express';
import { fetchcreatePaiement, getAllPaiements, fetchdeletePaiement, fetchPaiementById,handleCreatePaiement,handleGetPaiementsByIdentificationClient,handleGetPaiementsByNumeroContrat } from './paiement.controller.js';

const router = express.Router();

router.post('/', fetchcreatePaiement);
router.get('/', getAllPaiements);       // GET /paiements
router.delete('/:id', fetchdeletePaiement);
router.get('/:id', fetchPaiementById);
router.post('/finances/enregistrer-encaissement-digital', handleCreatePaiement);
router.get(
  '/finances/identification/:identificationClient',
  handleGetPaiementsByIdentificationClient
);

router.get('/finances/:numeroContrat', handleGetPaiementsByNumeroContrat);

export default router;
