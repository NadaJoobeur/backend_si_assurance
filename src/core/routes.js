import express from 'express';
import personneRoutes from '../modules/Personne/personne.routes.js'
import profilRoutes from '../modules/profil/profil.routes.js'
import userRoutes from '../modules/user/user.routes.js';
import contratRoutes from "../modules/contrat/contrat.routes.js"
import devisRoutes from "../modules/devis/devis.routes.js";
import agenceRoutes from '../modules/agence/agence.routes.js';
import paiementRoutes from '../modules/paiement/paiement.routes.js';
import sinistreRoutes from "../modules/sinistre/sinistre.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js"

const router = express.Router();
router.use('/auth', userRoutes)
router.use('/personnes', personneRoutes )
router.use('/contrats', contratRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client
router.use('/devis', devisRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client
router.use('/agences', agenceRoutes); // endpoint: /api/contrats/:numeroIdentification/contrats-client
router.use('/paiements',paiementRoutes );
router.use('/profil',profilRoutes );
router.use('/sinistres',sinistreRoutes );
router.use('/dashboard',dashboardRoutes);
export default router;
