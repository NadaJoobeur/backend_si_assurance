/**
 * @swagger
 * /agence/{numeroIdentifiant}/ListAgencesParClient:
 *   get:
 *     tags:
 *       - Agences
 *     summary: Liste des agences où le client a au moins un contrat actif
 *     parameters:
 *       - in: path
 *         name: numeroIdentifiant
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant unique du client
 *     responses:
 *       200:
 *         description: Liste des agences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nomEntiteOrganisationnelle:
 *                     type: string
 *                   codeEntite:
 *                     type: string
 *       500:
 *         description: Erreur interne
 */
