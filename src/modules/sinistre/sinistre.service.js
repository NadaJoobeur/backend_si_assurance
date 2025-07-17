import Sinistre from '../sinistre/sinistre.model.js'; // ou le bon chemin si différent
import { v4 as uuidv4 } from 'uuid'; // pour générer un numeroSinistre unique
import { Op } from 'sequelize';
import Reglement from './reglement.model.js';
import GarantiesContrat from '../contrat/garantieContrat.model.js'
import Contrat from '../contrat/contrat.model.js';
import SinistreTimeline from './sinistreTimeline.model.js';

export const createSinistreService = async (payload) => {
  const numeroSinistre = `SIN-${uuidv4().split('-')[0]}`;

  // Création du sinistre
  const sinistre = await Sinistre.create({
    numeroContrat: payload.numeroContrat,
    numeroSinistre: numeroSinistre,
    numeroImmatriculation: payload.numeroImmatriculation || [],
    statut: payload.statut || 'OUVERT',
    dateSinistre: payload.dateSinistre,
    optionReparation: payload.OptionReparation || null,
    motifRejet: payload.motifRejet || null,
    lieuSinistre: payload.lieuSinistre || null,
    conducteur: payload.conducteur || null,
    typeConducteur: payload.typeConducteur || null,
    identifiantPrincipal: payload.identifiantPrincipal
  });

  return sinistre;
};


export async function listSinistres() {
  try {
    // Récupérer toutes les agences
    const devis = await Sinistre.findAll();
    return devis;
  } catch (error) {
    throw error;
  }
}


export async function deleteSinistreService (numeroSinistre){
      return await Sinistre.destroy({ where: { numeroSinistre: numeroSinistre } })

}

export const detailSinistreService = async (numeroSinistre) => {
  try {
    const sinistre = await Sinistre.findOne({
      where: { numeroSinistre }
    });

    return sinistre;
  } catch (error) {
    console.error('Erreur lors de la recherche du sinistre :', error);
    throw error;
  }
};
export const updateSinistreService = async ({ numeroSinistre, ...data }) => {
  // Supprimer manuellement "id" si présent dans data
  if ('id' in data) delete data.id;

  const [updated] = await Sinistre.update(data, {
    where: { numeroSinistre }
  });

  if (updated === 0) {
    throw new Error("Sinistre introuvable ou aucune modification effectuée.");
  }

  // Puisqu'on cherche par numeroSinistre (qui est unique), on peut faire :
  const updatedSinistre = await Sinistre.findOne({ where: { numeroSinistre } });
  return updatedSinistre;
};


//Nada

export async function getSinistresByClient(identifiantClient) {
  console.log('>>> getSinistresByClient', identifiantClient);

  const sixYearsAgo = new Date();
  sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6);

  const result = await Sinistre.findAll({
    where: {
      identifiantPrincipal: identifiantClient,
      statut: { [Op.notIn]: ['Annulé', 'Sans Effet'] },
      dateSinistre: { [Op.gte]: sixYearsAgo },
    },
  });

  console.log('>>> Resultat Sequelize:', result);
  return result;
}


export async function getReglementsByNumeroSinistre(numeroSinistre) {
  console.log('>>> getReglementsByNumeroSinistre', numeroSinistre);
  const result = await Reglement.findAll({
    where: { numeroSinistre },
    attributes: ['natureReglement', 'montantReglement', 'dateReglement'],
    order: [['dateReglement', 'ASC']],
  });
  console.log('>>> Resultat Sequelize Reglements:', result);
  return result;
}

export async function getGarantiesByNumeroSinistre(numeroSinistre) {
  // 1️⃣ Chercher le sinistre
  const sinistre = await Sinistre.findOne({ where: { numeroSinistre } });
  if (!sinistre) {
    return null; // Pour controller: 204 ou 404
  }

  // 2️⃣ Chercher les garanties associées
  const garanties = await GarantiesContrat.findAll({
    where: { numeroContrat: sinistre.numeroContrat },
    attributes: ['libelleGarantie'],
  });

  return garanties.map(g => g.libelleGarantie);
}


export async function getStatutsSinistre() {
  // Liste métier figée
  return [
    'En cours',
    'Clos',
    'Rejeté',
    'En attente d’expertise',
    'Indemnisé'
  ];
}


export async function getSinistresByClientAndProduit(identifiantPrincipal, codeProduit) {
  return Sinistre.findAll({
    where: { identifiantPrincipal },
    include: [
      {
        model: Contrat,
        as: 'Contrat', // ATTENTION : Vérifie bien le alias si tu as mis `Sinistre.belongsTo(Contrat, { foreignKey: 'numeroContrat' })`
        required: true,
        where: {
          branche: 'AUTO',
          ...(codeProduit ? { codeOffreCommerciale: codeProduit } : {})
        }
      }
    ]
  });
}


export async function getTimelineByNumeroSinistre(numeroSinistre) {
  return await SinistreTimeline.findAll({
    where: { numeroSinistre },
    order: [['dateStatut', 'ASC']],
    attributes: ['statut', 'dateStatut', 'commentaire']
});
}