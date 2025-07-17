/**
 * @swagger
 * tags:
 *   - name: Paiements
 *     description: Gère l’enregistrement et la consultation des paiements clients.
 */


/**
 * @swagger
 * /paiements/finances/enregistrer-encaissement-digital:
 *   post:
 *     summary: Créer un nouveau paiement et enregistrer l'encaissement
 *     tags:
 *       - Paiements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaiementInput'
 *     responses:
 *       201:
 *         description: Paiement et encaissement créés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaiementResponse'
 *       500:
 *         description: Erreur lors de la création du paiement
 */

/**
 * @swagger
 * /paiements/finances/identification/{identificationClient}:
 *   get:
 *     summary: Récupérer tous les paiements par numéro d'identification client
 *     tags: [Paiements]
 *     parameters:
 *       - in: path
 *         name: identificationClient
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identification du client (ex. CIN)
 *     responses:
 *       200:
 *         description: Liste des paiements liés à cet identifiant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paiement'
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /paiements/finances/{numeroContrat}:
 *   get:
 *     summary: Récupérer tous les paiements pour un numéro de contrat
 *     tags:
 *       - Paiements
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         schema:
 *           type: string
 *         required: true
 *         description: Numéro de contrat
 *     responses:
 *       200:
 *         description: Liste des paiements trouvés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paiement'
 *       404:
 *         description: Aucun paiement trouvé pour ce numéro de contrat
 */

