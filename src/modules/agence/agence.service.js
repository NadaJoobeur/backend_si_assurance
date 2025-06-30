// src/modules/agence/agence.service.js
import Contrat from '../contrat/contrat.model.js';
import Agence from './agence.model.js';

export const findAgencesByNumeroIdentifiant = async (numeroIdentifiant) => {
  // Étape 1 : Chercher contrats
  const contrats = await Contrat.findAll({
    where: { numeroIdentification: numeroIdentifiant },
    attributes: ['id_agence'],
    raw: true,
  });

  // Étape 2 : Extraire ID uniques
  const idsAgences = [...new Set(contrats.map(c => c.id_agence))].filter(Boolean);

  if (idsAgences.length === 0) return [];

  // Étape 3 : Chercher les agences liées
  const agences = await Agence.findAll({
    where: { id_agence: idsAgences },
    attributes: [
      ['nom_agence', 'nomEntiteOrganisationnelle'],
      ['code_agence', 'codeEntite'],
    ],
    raw: true,
  });

  return agences;
};

export async function createAgence(data) {
  try {
    // Création d'une nouvelle agence en base
    const newAgence = await Agence.create(data);
    return newAgence;
  } catch (error) {
    // Remonter l'erreur au controller pour gestion
    throw error;
  }
}
export async function listAgences() {
  try {
    // Récupérer toutes les agences
    const agences = await Agence.findAll();
    return agences;
  } catch (error) {
    throw error;
  }
}
export async function deleteAgenceByCode(code_agence) {
  try {
    const deletedCount = await Agence.destroy({
      where: { code_agence:code_agence }
    });

    return deletedCount; // 0 si non trouvé, 1 si supprimé
  } catch (error) {
    throw error;
  }
}

export async function updateAgenceByCode(code_agence, newData) {
  try {
    // Vérifier si l’agence existe
    const agence = await Agence.findOne({ where: { code_agence } });

    if (!agence) {
      return null; // pour signaler qu’elle n’existe pas
    }

    // Mettre à jour les champs
    await agence.update(newData);

    return agence;
  } catch (error) {
    throw error;
  }
}

export async function getAgenceDetails(code_agence) {
  try {
    const agence = await Agence.findOne({
      where: { code_agence }
    });

    return agence; // null si non trouvée
  } catch (error) {
    throw error;
  }
}