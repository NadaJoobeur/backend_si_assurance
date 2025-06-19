import express from 'express';
import userRoutes from '../modules/user/user.routes.js';

const router = express.Router();
router.use('/auth', userRoutes)


export default router;