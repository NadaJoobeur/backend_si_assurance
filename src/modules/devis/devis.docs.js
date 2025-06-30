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
 * /devis/{numeroContrat}/decompte:
 *   get:
 *     tags:
 *       - Devis
 *     summary: Calculer le décompte du devis pour un contrat donné
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro de contrat à calculer
 *     responses:
 *       200:
 *         description: Résultat du calcul du décompte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 montantCommission:
 *                   type: number
 *                   example: 120.5
 *                 montantFrais:
 *                   type: number
 *                   example: 24.1
 *                 montantPrimeNette:
 *                   type: number
 *                   example: 1000.0
 *                 montantTaxe:
 *                   type: number
 *                   example: 190.0
 *                 montantPrimeTotale:
 *                   type: number
 *                   example: 1334.6
 *       404:
 *         description: Profil ou pack introuvable
 *       500:
 *         description: Erreur interne serveur
 */
