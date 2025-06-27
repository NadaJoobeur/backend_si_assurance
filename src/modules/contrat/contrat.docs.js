/**
 * @swagger
 * tags:
 *   - name: Contrats
 *     description: Gestion des contrats, véhicules et garanties d'un client
 * 
 */


/**
 * @swagger
 * /contrats/{numeroIdentification}/contrats-client:
 *   get:
 *     tags:
 *       - Contrats
 *     
 *     summary: Liste des contrats d'un client
 *     parameters:
 *       - in: path
 *         name: numeroIdentification
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d'identification du client
 *       - in: query
 *         name: etatContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: État du contrat (obligatoire)
 *       - in: query
 *         name: echeance
 *         required: false
 *         schema:
 *           type: string
 *           example: "0625"
 *         description: Échéance contractuelle au format JJMM (facultatif)
 *     responses:
 *       200:
 *         description: Liste des contrats retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroContrat:
 *                     type: string
 *                   branche:
 *                     type: string
 *                   codeBranche:
 *                     type: string
 *                   offreCommerciale:
 *                     type: string
 *                   codeOffreCommerciale:
 *                     type: string
 *                   immatriculation:
 *                     type: string
 *                   statutContrat:
 *                     type: string
 *                   primeAnnuelle:
 *                     type: string
 *                   echeanceContractuelle:
 *                     type: string
 *                   codeAgence:
 *                     type: string
 *                   libelleAgence:
 *                     type: string
 *                   dateExpiration:
 *                     type: string
 *                     format: date
 *                   dateEffet:
 *                     type: string
 *                     format: date
 *                   fractionnement:
 *                     type: string
 *                   nature:
 *                     type: string
 *                   indicateurSouscripteur:
 *                     type: boolean
 *                   indicateurAssure:
 *                     type: boolean
 *       204:
 *         description: Aucun contrat trouvé
 *       500:
 *         description: Erreur interne serveur
 */

/**
 * @swagger
 * /contrats/{numeroIdentification}/produits:
 *   get:
 *     tags:
 *       - Contrats
 *     
 *     summary: Liste des produits d’un client
 *     parameters:
 *       - in: path
 *         name: numeroIdentification
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d’identification du client
 *     responses:
 *       200:
 *         description: Liste des produits retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroContrat:
 *                     type: string
 *                   branche:
 *                     type: string
 *                   codeBranche:
 *                     type: string
 *                   offreCommerciale:
 *                     type: string
 *                   codeOffreCommerciale:
 *                     type: string
 *       204:
 *         description: Aucun produit trouvé
 *       500:
 *         description: Erreur interne serveur
 */

/**
 * @swagger
 * /contrats/{numeroIdentifiant}/garanties:
 *   get:
 *     tags:
 *       - Contrats
 *     
 *     summary: Liste des garanties d’un contrat
 *     parameters:
 *       - in: path
 *         name: numeroIdentifiant
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro d’identification du client
 *       - in: query
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat à rechercher
 *     responses:
 *       200:
 *         description: Liste des garanties retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   libelleGarantie:
 *                     type: string
 *                   capitalAssure:
 *                     type: string
 *                   franchise:
 *                     type: string
 *                   rangAffichage:
 *                     type: integer
 *                   codeGarantie:
 *                     type: string
 *       204:
 *         description: Aucune garantie trouvée
 *       500:
 *         description: Erreur interne serveur
 */

/**
 * @swagger
 * /contrats/{numeroContrat}/profils:
 *   get:
 *     tags:
 *       - Contrats
 *    
 *     summary: Récupérer les véhicules liés à un contrat assuré
 *     description: >
 *       Cet endpoint permet de récupérer la liste des véhicules associés à un assuré donné, à partir de son numéro de contrat.  
 *       Le contrat doit avoir l'attribut `indicateurAssure = true`. Si aucun véhicule n'est trouvé, un code 204 est retourné.
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat d'assurance
 *     responses:
 *       200:
 *         description: Liste des véhicules retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   marque:
 *                     type: string
 *                     example: Toyota
 *                   modele:
 *                     type: string
 *                     example: Yaris
 *                   immatriculation:
 *                     type: string
 *                     example: 123TN456
 *       204:
 *         description: Aucun véhicule trouvé pour ce contrat
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /contrats/{numeroContrat}/update:
 *   put:
 *     tags:
 *       - Contrats
 *     summary: Mettre à jour un contrat et enregistrer les modifications dans l’historique
 *     description: >
 *       Cet endpoint permet de mettre à jour les champs d’un contrat spécifique, et de sauvegarder automatiquement l’historique des champs modifiés dans la table `HistoriqueContrat`.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Le numéro unique du contrat à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               branche: "Auto"
 *               primeAnnuelle: "1200.00"
 *               statutContrat: "Actif"
 *     responses:
 *       200:
 *         description: Contrat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contrat'
 *       404:
 *         description: Contrat non trouvé
 *       500:
 *         description: Erreur interne serveur
 */



/**
 * @swagger
 * /contrats/{numeroContrat}/updateGarantie:
 *   put:
 *     summary: Mise à jour des garanties d’un contrat et historisation des changements
 *     tags:
 *       - Contrats
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelleGarantie:
 *                 type: string
 *                 example: "Vol"
 *               capitalAssure:
 *                 type: string
 *                 example: "15000"
 *               franchise:
 *                 type: string
 *                 example: "500"
 *               rangAffichage:
 *                 type: integer
 *                 example: 1
 *               codeGarantie:
 *                 type: string
 *                 example: "G123"
 *     responses:
 *       200:
 *         description: Garantie mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Garantie mise à jour
 *       404:
 *         description: Garantie non trouvée
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /contrats/{numeroContrat}/updateProfilVehicule:
 *   put:
 *     summary: Met à jour un profil véhicule et enregistre l’historique des changements
 *     tags:
 *       - Contrats
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat du véhicule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               marque: "Peugeot"
 *               puissanceFiscale: "8"
 *               usage: "Affaires"
 *     responses:
 *       200:
 *         description: Profil véhicule mis à jour avec succès
 *       404:
 *         description: Profil véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /contrats/{numContrat}/difference:
 *   get:
 *     summary: Récupérer les différences d’un contrat (avenants)
 *     tags:
 *       - Contrats
 *     parameters:
 *       - in: path
 *         name: numContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat à consulter
 *     responses:
 *       200:
 *         description: Liste des modifications du contrat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 champsModifies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nomChamp:
 *                         type: string
 *                       ancienneValeur:
 *                         type: string
 *                       nouvelleValeur:
 *                         type: string
 *                 objetsModifies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nomObjet:
 *                         type: string
 *                       typeModification:
 *                         type: string
 *                       champsModifies:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nomChamp:
 *                               type: string
 *                             ancienneValeur:
 *                               type: string
 *                             nouvelleValeur:
 *                               type: string
 *                 montantPrime:
 *                   type: number
 *       500:
 *         description: Erreur serveur
 */



/**
 * @swagger
 * /contrats/{numeroContrat}/autresGaranties:
 *   get:
 *     summary: Obtenir les packs non choisis + garanties optionnelles non souscrites
 *     tags:
 *       - Contrats
 *     parameters:
 *       - in: path
 *         name: numeroContrat
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du contrat client
 *     responses:
 *       200:
 *         description: Liste des packs proposés et garanties optionnelles disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packsProposes:
 *                   type: array
 *            
 *                 garantiesOptionnellesProposees:
 *                   type: array
 *                   
 *       204:
 *         description: Aucune formule trouvée pour ce contrat
 *       500:
 *         description: Erreur interne serveur
 */