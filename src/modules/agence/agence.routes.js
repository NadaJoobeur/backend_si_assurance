import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import {
   createAgenceController,
ListAgenceController,
DeleteAgenceController,
UpdateAgenceController,
DtailAgenceController
} from './agence.controller.js'

const router = express.Router()

router.post('/addAgence', authMiddleware,  createAgenceController)
router.get('/listAgence', authMiddleware, ListAgenceController)
router.patch('/UpdateAgence/:code_agence',authMiddleware,UpdateAgenceController),
router.get('/:code_agence/details',authMiddleware,DtailAgenceController),
router.delete('/DeleteAgence/:code_agence', authMiddleware, DeleteAgenceController)


export default router
