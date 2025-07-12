/**
 * @swagger
 * /devis/{numeroContrat}/parametres-generaux/pack-garanties:
 *   post:
 *     tags:
 *       - Devis
 *     summary: Récupérer la liste des garanties personnalisées AUTO
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro de contrat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ageVehicule:
 *                 type: string
 *               usage:
 *                 type: string
 *               nbr_place:
 *                 type: string
 *               nbr_chevaux:
 *                 type: string
 *               bonus_malus:
 *                 type: string
 *               valeur_venal:
 *                 type: string
 *               valeur_a_neuf:
 *                 type: string
 *             required:
 *               - ageVehicule
 *               - usage
 *               - nbr_place
 *               - nbr_chevaux
 *               - bonus_malus
 *     responses:
 *       200:
 *         description: Liste des packs et garanties recommandés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codePack:
 *                         type: string
 *                       nomPack:
 *                         type: string
 *                       descriptionPack:
 *                         type: string
 *                       codeOffre:
 *                         type: string
 *                       garanties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             codeTypeGarantie:
 *                               type: string
 *                             nomTypeGarantie:
 *                               type: string
 *                             capitalGarantie:
 *                               type: number
 *                             capitalMaximum:
 *                               type: number
 *                             capitalMinimum:
 *                               type: number
 *                             typeGarantie:
 *                               type: integer
 *                             ordre:
 *                               type: integer
 *                             franchises:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   valeur:
 *                                     type: number
 *                                   codeType:
 *                                     type: string
 *                                   nomType:
 *                                     type: string
 *                             limites:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   valeurLimite:
 *                                     type: number
 *                                   codeType:
 *                                     type: string
 *                                   nomType:
 *                                     type: string
 *                 garantiesOptionnelles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       libelle:
 *                         type: string
 *                       capital:
 *                         type: string
 *                       franchise:
 *                         type: string
 *                       code:
 *                         type: string
 *                       capitalMaximum:
 *                         type: number
 *                       capitalMinimum:
 *                         type: number
 *       204:
 *         description: Aucun pack trouvé
 *       500:
 *         description: Erreur interne serveur
 */


/**
 * @swagger
 * /devis/decompte:
 *   post:
 *     tags:
 *       - Devis
 *     summary: Calculer le décompte du devis à partir des données saisies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valeurVenale:
 *                 type: string
 *                 example: "25000"
 *               bonusMalus:
 *                 type: string
 *                 example: "0.95"
 *               packChoisi:
 *                 type: object
 *                 properties:
 *                   codePack:
 *                     type: string
 *                     example: "RC"
 *               garantiesOptionnelles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     codeGarantieOptionnelle:
 *                       type: string
 *                       example: "VREMP"
 *     responses:
 *       200:
 *         description: Résultat du calcul du décompte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     montantPack:
 *                       type: number
 *                       example: 500
 *                     montantGarantiesPack:
 *                       type: number
 *                       example: 2300
 *                     montantGarantiesOptionnelles:
 *                       type: number
 *                       example: 50
 *                     montantPrimeNette:
 *                       type: number
 *                       example: 2850
 *                     montantCommission:
 *                       type: number
 *                       example: 285
 *                     montantFrais:
 *                       type: number
 *                       example: 57
 *                     montantTaxe:
 *                       type: number
 *                       example: 541.5
 *                     montantPrimeTotale:
 *                       type: number
 *                       example: 3733.5
 *       400:
 *         description: Paramètres invalides ou manquants
 *       500:
 *         description: Erreur interne serveur
 */


/**
 * @swagger
 * /parametres-generaux/genresVehicule:
 *   get:
 *     summary: Liste des genres de véhicules
 *     description: Récupère la liste des genres de véhicules avec code et libellé.
 *     tags:
 *       - Devis
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "00670001"
 *                   libelle:
 *                     type: string
 *                     example: "Voiture"
 *       500:
 *         description: Erreur interne serveur
 */

