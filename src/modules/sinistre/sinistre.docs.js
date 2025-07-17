/**
 * @swagger
 * tags:
 *   name: Sinistres
 *   description: Gestion des sinistres
 */

/**
 * @swagger
 * /sinistres/{identifiantClient}:
 *   get:
 *     summary: Liste des sinistres par identifiant client
 *     tags: [Sinistres]
 *     parameters:
 *       - in: path
 *         name: identifiantClient
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant principal du client
 *     responses:
 *       200:
 *         description: Liste des sinistres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroContrat:
 *                     type: string
 *                     example: C000
 *                   numeroSinistre:
 *                     type: string
 *                     example: S001
 *                   numeroImmatriculation:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["123-TN-456"]
 *                   statut:
 *                     type: string
 *                     example: En cours
 *                   dateSinistre:
 *                     type: string
 *                     format: date
 *                     example: 2024-07-13
 *                   optionReparation:
 *                     type: string
 *                   motifRejet:
 *                     type: string
 *                   lieuSinistre:
 *                     type: string
 *                   conducteur:
 *                     type: string
 *                   typeConducteur:
 *                     type: string
 *       204:
 *         description: Aucun sinistre trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /sinistres/{numeroSinistre}/reglements:
 *   get:
 *     summary: Liste des règlements par numéro de sinistre
 *     tags: [Sinistres]
 *     parameters:
 *       - in: path
 *         name: numeroSinistre
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du sinistre
 *     responses:
 *       200:
 *         description: Liste des règlements récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   natureReglement:
 *                     type: string
 *                     example: Avance
 *                   montantReglement:
 *                     type: string
 *                     example: "1500.00"
 *                   dateReglement:
 *                     type: string
 *                     format: date
 *                     example: 2024-07-15
 *       204:
 *         description: Aucun règlement trouvé
 *       500:
 *         description: Erreur serveur interne
 */


/**
 * @swagger
 * /sinistres/{numeroSinistre}/garanties:
 *   get:
 *     summary: Liste des garanties par numéro de sinistre
 *     tags: [Sinistres]
 *     parameters:
 *       - in: path
 *         name: numeroSinistre
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du sinistre
 *     responses:
 *       200:
 *         description: Liste des garanties récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Responsabilité Civile
 *       204:
 *         description: Aucun sinistre ou garantie trouvée
 *       500:
 *         description: Erreur serveur interne
 */


/**
 * @swagger
 * /sinistres/statuts:
 *   get:
 *     summary: Liste des statuts possibles pour un sinistre
 *     tags: [Sinistres]
 *     responses:
 *       200:
 *         description: Liste des statuts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: En cours
 *       204:
 *         description: Aucun statut trouvé
 *       500:
 *         description: Erreur serveur interne
 */


/**
 * @swagger
 * /sinistres/{identifiantPrincipal}:
 *   get:
 *     summary: Liste des sinistres d’un client filtrés par branche et produit
 *     tags: [Sinistres]
 *     parameters:
 *       - in: path
 *         name: identifiantPrincipal
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant principal du client
 *       - in: query
 *         name: produit
 *         required: false
 *         schema:
 *           type: string
 *         description: Code du produit (codeOffreCommerciale)
 *     responses:
 *       200:
 *         description: Liste des sinistres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroContrat:
 *                     type: string
 *                     example: C000
 *                   numeroSinistre:
 *                     type: string
 *                     example: S0001
 *                   numeroImmatriculation:
 *                     type: string
 *                     example: 123-TN-456
 *                   statut:
 *                     type: string
 *                     example: En cours
 *                   dateSinistre:
 *                     type: string
 *                     example: 2024-06-15
 *                   optionReparation:
 *                     type: string
 *                     example: Réparation Garage Agréé
 *                   motifRejet:
 *                     type: string
 *                     example: Dossier incomplet
 *                   lieuSinistre:
 *                     type: string
 *                     example: Tunis
 *                   conducteur:
 *                     type: string
 *                     example: Ahmed Ben Ali
 *                   typeConducteur:
 *                     type: string
 *                     example: Notre assuré
 *       204:
 *         description: Aucun sinistre trouvé
 *       500:
 *         description: Erreur interne serveur
 */


/**
 * @swagger
 * /sinistres/{numeroSinistre}/timelines:
 *   get:
 *     summary: Timeline d’un sinistre par numéro de sinistre
 *     tags: [Sinistres]
 *     parameters:
 *       - in: path
 *         name: numeroSinistre
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du sinistre
 *     responses:
 *       200:
 *         description: Timeline récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   statut:
 *                     type: string
 *                     example: En cours
 *                   dateStatut:
 *                     type: string
 *                     format: date
 *                     example: 2024-06-16
 *                   commentaire:
 *                     type: string
 *                     example: Dossier en cours d’étude
 *       204:
 *         description: Aucune donnée trouvée
 *       500:
 *         description: Erreur serveur interne
 */
