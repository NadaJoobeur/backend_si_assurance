import express from 'express';
import userRoutes from '../modules/user/user.routes.js';
import personneRoutes from '../modules/Personne/personne.routes.js'

const router = express.Router();
router.use('/auth', userRoutes)
router.use('/personnes', personneRoutes )


export default router;