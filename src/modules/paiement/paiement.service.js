import Paiement from './paiement.model.js';
import Contrat from '../contrat/contrat.model.js';


export const createPaiement = async (data) => {
  return await Paiement.create({
    codeAgence: data.codeAgence,
    transactionDate: data.transactionDate,
    orderId: data.orderId,
    orderNumber: data.orderNumber,
    cardholderName: data.cardholderName,
    depositAmount: data.depositAmount,
    currency: data.currency,
    listeQuittances: data.listeQuittances,
  });
};

export const deletePaiement = async (id) => {
  const paiement = await Paiement.findByPk(id);

  if (!paiement) {
    throw new Error('Paiement non trouvé');
  }

  await paiement.destroy();
};

export const createPaiement1 = async (data) => {
  // Vérifier chaque quittance
  for (const quittance of data.listeQuittances) {
    const { numeroContrat, identifionClient } = quittance;

    if (!numeroContrat || !identifionClient) {
      throw new Error('Chaque quittance doit avoir numeroContrat ET identifionClient.');
    }

    // Vérifier existence contrat
    const contrat = await Contrat.findOne({
      where: {
        numeroContrat: numeroContrat,
        numeroIdentification: identifionClient,
      },
    });

    if (!contrat) {
      throw new Error(
        `Contrat introuvable pour numeroContrat=${numeroContrat} et identifionClient=${identifionClient}`
      );
    }
  }

  // Tous les contrôles OK => on crée le paiement
  return await Paiement.create({
    codeAgence: data.codeAgence,
    transactionDate: data.transactionDate,
    orderId: data.orderId,
    orderNumber: data.orderNumber,
    cardholderName: data.cardholderName,
    depositAmount: data.depositAmount,
    currency: data.currency,
    listeQuittances: data.listeQuittances,
  });
};

export const getPaiementsByIdentificationClient = async (identificationClient) => {
  // On récupère tous les paiements où une quittance a cet identifiant
  const paiements = await Paiement.findAll();

  // ⚡ Utilise la vraie clé JSON existante !
  const filtered = paiements.filter((p) =>
    p.listeQuittances?.some(
      (q) => q.identifionClient === identificationClient
    )
  );

  // 🔒 Vérifie s’il y a au moins 1 paiement
  if (filtered.length === 0) {
    throw new Error(
      `Aucun paiement trouvé pour le numéro d'identification : ${identificationClient}`
    );
  }

  return filtered;
};

export const getPaiementsByNumeroContrat = async (numeroContrat) => {
  const paiements = await Paiement.findAll();

  const filtered = paiements.filter((p) =>
    p.listeQuittances?.some(
      (q) => q.numeroContrat === numeroContrat
    )
  );

  if (filtered.length === 0) {
    throw new Error(
      `Aucun paiement trouvé pour le numéro de contrat : ${numeroContrat}`
    );
  }

  return filtered;
};
