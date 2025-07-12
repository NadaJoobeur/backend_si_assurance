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

/**
 * @swagger
 * /agences/parametres-generaux/branches:
 *   get:
 *     tags:
 *       - Agences
 *     summary: Récupérer toutes les branches d'assurance
 *     description: Retourne la liste des branches (codeBranche et branche) depuis la table contrats.
 *     responses:
 *       200:
 *         description: Liste des branches trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codeBranche:
 *                     type: string
 *                     example: AUTO01
 *                   branche:
 *                     type: string
 *                     example: Auto
 *       204:
 *         description: Aucun résultat trouvé
 *       500:
 *         description: Erreur interne du serveur
 */



/**
 * @swagger
 * /agences/parametres-generaux/{codeAgence}/branches:
 *   get:
 *     summary: Liste des branches filtrées par code agence.
 *     tags: [Agences]
 *     parameters:
 *       - in: path
 *         name: codeAgence
 *         schema:
 *           type: string
 *         required: true
 *         description: Code de l'agence
 *     responses:
 *       200:
 *         description: Liste des branches.
 *       204:
 *         description: Aucune branche trouvée.
 *       500:
 *         description: Erreur interne serveur.
 */


/**
 * @swagger
 * /agences/parametres-generaux/offres:
 *   get:
 *     summary: Liste des offres commerciales (toutes)
 *     tags: [Agences]
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         description: Pas de données
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /agences/parametres-generaux/{codeBranche}/offres:
 *   get:
 *     summary: Liste des offres commerciales par code branche
 *     tags: [Agences]
 *     parameters:
 *       - name: codeBranche
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         description: Pas de données
 *       500:
 *         description: Erreur serveur
 */

