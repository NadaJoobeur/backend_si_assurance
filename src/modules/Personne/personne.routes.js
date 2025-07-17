import express from 'express'
import {
  createPerson,
  DeletePerson,
  ListPerson,
  DetailPerson,
  UpdatePerson,
  CheckBlackList,
  CheckPersonExist,
  CheckPersonExistence,
  modificationMoyenContact,
  verifierExistenceClient
} from './personne.controller.js'

import { authMiddleware } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/addPerson/:ownerId', authMiddleware, createPerson)
router.delete('/deletePerson/:numeroIdentification', authMiddleware, DeletePerson)
router.patch('/:numeroIdentification/modificationMoyenContact', authMiddleware, UpdatePerson)
router.get('/listPerson/:ownerId', authMiddleware, ListPerson)
router.get('/:numeroIdentification/existence-client', authMiddleware, CheckPersonExist)

/*Routes de specifiaction */

router.get('/:numeroIdentification/details', authMiddleware, DetailPerson)

router.get('/:numeroIdentification/blackListee', authMiddleware, CheckBlackList)

router.get('/:numeroIdentification/:numeroContrat/existence-client', authMiddleware, CheckPersonExistence)

router.get('/modificationMoyenContact'/*, authMiddleware*/, modificationMoyenContact);

router.get('/:numeroIdentite/:numeroContrat/existence-client', verifierExistenceClient);

export default router
