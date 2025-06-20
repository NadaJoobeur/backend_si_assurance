import express from 'express'
import { register, login } from './user.controller.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup', register)
router.post('/login', login)

export default router 

