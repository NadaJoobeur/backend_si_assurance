/**
 * @swagger
 * tags:
 *   name: Personnes
 *   description: Gère les opérations liées aux personnes (clients).
 */

/**
 * @swagger
 * /personnes/{numeroIdentite}/{numeroContrat}/existence-client:
 *   get:
 *     summary: Vérifie l'existence d'un client par identifiant et contrat
 *     tags: [Personnes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentite
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identité principal du client
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro de contrat du client
 *     responses:
 *       200:
 *         description: Client existe
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       204:
 *         description: Aucun client trouvé
 *       500:
 *         description: Erreur interne serveur
 */

/**
 * @swagger
 * /personnes/{numeroIdentification}/details:
 *   get:
 *     summary: Récupère les détails d'une personne physique ou morale par numéro d'identification principal
 *     tags: [Personnes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentification
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identification principal de la personne
 *     responses:
 *       200:
 *         description: Détails de la personne récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nom:
 *                   type: string
 *                   example: Asma
 *                 prenom:
 *                   type: string
 *                   example: Guirim
 *                 raisonSociale:
 *                   type: string
 *                   example: Pauvreté
 *                 dateDeNaissance:
 *                   type: string
 *                   example: 2025-07-01
 *                 activite:
 *                   type: string
 *                   example: Enseignante
 *                 listeAdresse:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       numRue:
 *                         type: integer
 *                         example: 29884210
 *                       nomRue:
 *                         type: string
 *                         example: Ebn el Jazzar
 *                       codePostal:
 *                         type: string
 *                         example: "5035"
 *                       contactParDefaut:
 *                         type: boolean
 *                         example: true
 *                 listeTelephone:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       numeroTelephone:
 *                         type: string
 *                         example: "29884210"
 *                       typeTelephone:
 *                         type: string
 *                         example: ""
 *                       contactParDefaut:
 *                         type: boolean
 *                         example: true
 *                 listeMails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       adresseMail:
 *                         type: string
 *                         example: ahlem@gmail.com
 *                       contactParDefaut:
 *                         type: boolean
 *                         example: true
 *                 blackList:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Requête invalide, paramètre manquant
 *       204:
 *         description: Aucun client trouvé
 *       500:
 *         description: Problème technique. Impossible de retrouver le client.
 */


/**
 * @swagger
 * /personnes/{numeroIdentification}/blackListee:
 *   get:
 *     summary: Vérifie si le client est black-listé ou non
 *     tags: [Personnes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentification
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identification principal de la personne
 *     responses:
 *       200:
 *         description: Résultat de la vérification de la liste noire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blacklist:
 *                   type: boolean
 *                   example: false
 *       204:
 *         description: Aucun client trouvé
 *       500:
 *         description: Problème technique. Impossible de retrouver le client.
 */


/**
 * @swagger
 * /personnes/{numeroIdentification}/modificationMoyenContact:
 *   patch:
 *     summary: Met à jour les moyens de contact d'une personne
 *     tags: [Personnes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentification
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identification principal de la personne
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listeAdresse:
 *                 type: array
 *                 description: Liste des adresses mises à jour
 *                 items:
 *                   type: object
 *                   properties:
 *                     numRue:
 *                       type: integer
 *                       example: 123
 *                     nomRue:
 *                       type: string
 *                       example: Rue Ibn Khaldoun
 *                     contactParDefaut:
 *                       type: boolean
 *                       example: true
 *                     codePostal:
 *                       type: string
 *                       example: "1002"
 *                     libelleCodePostal:
 *                       type: string
 *                       example: Tunis
 *                     delegation:
 *                       type: string
 *                       example: Tunis Centre
 *               listeTelephone:
 *                 type: array
 *                 description: Liste des téléphones mis à jour
 *                 items:
 *                   type: object
 *                   properties:
 *                     numeroTelephone:
 *                       type: string
 *                       example: "29884210"
 *                     typeTelephone:
 *                       type: string
 *                       example: Mobile
 *                     contactParDefaut:
 *                       type: boolean
 *                       example: true
 *               listeMails:
 *                 type: array
 *                 description: Liste des emails mis à jour
 *                 items:
 *                   type: object
 *                   properties:
 *                     adresseMail:
 *                       type: string
 *                       example: exemple@domain.tn
 *                     contactParDefaut:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Mise à jour effectuée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       204:
 *         description: Aucun client trouvé ou aucune modification effectuée
 *       500:
 *         description: Problème technique. Impossible de mettre à jour le client.
 */
