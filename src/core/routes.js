import express from 'express';
const router = express.Router();
// Route d'accueil
router.get('/', (req, res) => {
  res.send('Hello');
});


export default router;