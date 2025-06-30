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
