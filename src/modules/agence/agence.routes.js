// src/modules/agence/agence.routes.js
import express from 'express';
import { getAgencesClient } from './agence.controller.js';
import {
   createAgenceController,
ListAgenceController,
DeleteAgenceController,
UpdateAgenceController,
DtailAgenceController,
fetchgetBranches,
getBranchesByAgence,
fetchAllOffres,
fetchOffresByCodeBranche,
getAllAgencesAss
} from './agence.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/:numeroIdentifiant/ListAgencesParClient', getAgencesClient);
router.post('/addAgence', authMiddleware,  createAgenceController)
router.get('/listAgence', authMiddleware, ListAgenceController)
router.patch('/UpdateAgence/:code_agence',authMiddleware,UpdateAgenceController),
router.get('/:code_agence/details',authMiddleware,DtailAgenceController),
router.delete('/DeleteAgence/:code_agence', authMiddleware, DeleteAgenceController)
//Nada
router.get('/parametres-generaux/branches', fetchgetBranches)
router.get('/parametres-generaux/:codeAgence/branches', getBranchesByAgence);
router.get('/parametres-generaux/offres', fetchAllOffres);
router.get('/parametres-generaux/:codeBranche/offres', fetchOffresByCodeBranche);

export default router;




