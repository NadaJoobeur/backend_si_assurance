// src/modules/contrat/contrat.service.js
import Contrat from './contrat.model.js';
import GarantieContrat from './garantieContrat.model.js';
import ProfilVehicule from './profilVehicule.model.js';
import fs from 'fs';
import HistoriqueContrat from './historiqueContrat.model.js';
import HistoriqueGaranties from './HistoriqueGaranties.model.js';
import HistoriquePrifilVehicule from './HistoriqueProfilVehicule.model.js';
import Pack from './Pack.js';
import path from 'path';

export const getContratsClient = async ({ numeroIdentification, etatContrat, echeance }) => {
  const whereClause = {
    numeroIdentification,
    statutContrat: etatContrat
  };

  if (echeance) {
    whereClause.echeanceContractuelle = echeance;
  }

  const contrats = await Contrat.findAll({ where: whereClause });
  return contrats;
};

export const getProduitsClient = async (numeroIdentification) => {
  return await Contrat.findAll({
    where: {
      numeroIdentification
    },
    attributes: [
      'numeroContrat',
      'branche',
      'codeBranche',
      'offreCommerciale',
      'codeOffreCommerciale'
    ]
  });
};

export const getGarantiesContrat = async (numeroContrat) => {
  return await GarantieContrat.findAll({
    where: { numeroContrat },
    attributes: ['libelleGarantie', 'capitalAssure', 'franchise', 'rangAffichage', 'codeGarantie']
  });
};


export const getVehiculesParContrat = async (numeroContrat) => {
  const contrat = await Contrat.findOne({
    where: {
      numeroContrat,
      indicateurAssure: true
    },
    include: [
      {
        model: ProfilVehicule,
        required: true
      }
    ]
  });

  if (!contrat) {
    throw new Error('Contrat non trouvé ou assuré non valide.');
  }

  return contrat.ProfilVehicules; // alias Sequelize
};



export async function updateContrat(numeroContrat, updates) {
  // Chercher contrat
  console.log('updateContrat called with:', numeroContrat);

  const contrat = await Contrat.findOne({ where: { numeroContrat } })
  if (!contrat) {
    return null
  }


  const oldData = contrat.toJSON()
  console.log("OLD DATA:", oldData)
  console.log("UPDATES:", updates)


  // Mise à jour du contrat
  await contrat.update(updates)

  // Préparer la liste des changements
  const changedFields = []
  for (const key in updates) {
  const oldValue = String(oldData[key])
  const newValue = String(updates[key])
  if (oldValue !== newValue) {
    changedFields.push({
      nomChamp: key,
      ancienneValeur: oldData[key],
      nouvelleValeur: updates[key]
    })
  }
}

  console.log("aaa:",changedFields);

  // Enregistrer dans historique
  if (changedFields.length > 0) {
  await HistoriqueContrat.create({
    numeroContrat,
    data: changedFields
  })
}

  return contrat
}


export async function updateGarantie(numeroContrat, updates) {
  console.log('updateGarantie called with:', numeroContrat);

  const garantie = await GarantieContrat.findOne({ where: { numeroContrat } });
  if (!garantie) {
    return null;
  }

  const oldData = garantie.toJSON();
  console.log("OLD DATA:", oldData);
  console.log("UPDATES:", updates);

  // Mise à jour de la garantie
  await garantie.update(updates); // ⚠️ Mise à jour sur l'instance, pas le modèle

  // Préparer la liste des changements
  const changedFields = [];
  for (const key in updates) {
    const oldValue = String(oldData[key] ?? '');
    const newValue = String(updates[key] ?? '');
    if (oldValue !== newValue) {
      changedFields.push({
        nomChamp: key,
        ancienneValeur: oldData[key],
        nouvelleValeur: updates[key],
      });
    }
  }

  console.log("Champs modifiés:", changedFields);

  // Enregistrer dans historique
  if (changedFields.length > 0) {
    await HistoriqueGaranties.create({
      numeroContrat,
      data: changedFields
    });
  }

  return garantie;
}



export async function updateProfilVehicule(numeroContrat, updates) {
  console.log('updateProfilVehicule called with:', numeroContrat);

  const Profil_Vehicule = await ProfilVehicule.findOne({ where: { numeroContrat } });
  if (!Profil_Vehicule) {
    return null;
  }

  const oldData = Profil_Vehicule.toJSON();
  console.log("OLD DATA:", oldData);
  console.log("UPDATES:", updates);

  await Profil_Vehicule.update(updates); // mise à jour

  const changedFields = [];
  for (const key in updates) {
    const oldValue = String(oldData[key] ?? '');
    const newValue = String(updates[key] ?? '');
    if (oldValue !== newValue) {
      changedFields.push({
        nomChamp: key,
        ancienneValeur: oldData[key],
        nouvelleValeur: updates[key],
      });
    }
  }

  console.log("Champs modifiés:", changedFields);

  if (changedFields.length > 0) {
    await HistoriquePrifilVehicule.create({
      numeroContrat,
      data: changedFields
    });
  }

  return Profil_Vehicule;
}


export async function getDifferenceContrat(numContrat) {
  // 1. Historique des modifications simples (contrat)
  const historiquesContrat = await HistoriqueContrat.findAll({
    where: { numeroContrat: numContrat },
    order: [['createdAt', 'DESC']]
  });

  const champsModifies = historiquesContrat.flatMap(entry => entry.data || []);

  // 2. Historique des garanties
  const historiquesGarantie = await HistoriqueGaranties.findAll({
    where: { numeroContrat: numContrat },
    order: [['createdAt', 'DESC']]
  });

  const garantiesModifiees = historiquesGarantie.map(entry => ({
    nomObjet: "Garantie",
    typeModification: "modification",
    champsModifies: entry.data || []
  }));


  // 3. Historique des profils véhicule
  const historiquesProfil = await HistoriquePrifilVehicule.findAll({
    where: { numeroContrat: numContrat },
    order: [['createdAt', 'DESC']]
  });

  const profilsModifies = historiquesProfil.map(entry => ({
    nomObjet: "ProfilVehicule",
    typeModification: "modification",
    champsModifies: entry.data || []
  }));

  // 4. Montant de la prime
  const contrat = await Contrat.findOne({ where: { numeroContrat: numContrat } });
  const montantPrime = contrat?.primeAnnuelle ? parseFloat(contrat.primeAnnuelle) : 0.0;

  // 5. Construction de la réponse
  return {
    champsModifies,
    objetsModifies: [...garantiesModifiees, ...profilsModifies],
    montantPrime
  };
}



export async function getPacksEtGaranties(numeroContrat) {
  const packsJson = JSON.parse(fs.readFileSync(path.resolve('./src/data/packs.json')));

  const packClient = await Pack.findOne({ where: { numeroContrat } });
  const codePackChoisi = packClient?.codePack;

  if (!codePackChoisi) return { packsProposes: [], garantiesOptionnellesProposees: [] };

  const packsProposes = packsJson.filter(pack => pack.codePack !== codePackChoisi);

  const garantiesClient = await GarantieContrat.findAll({
    where: { numeroContrat },
    attributes: ['libelleGarantie']
  });

  const garantiesSouscrites = garantiesClient.map(g => g.libelleGarantie);

  const packOptionnel = packsJson.find(p => p.codePack === 'OPTIONS');

  const garantiesOptionnellesProposees = packOptionnel
    ? packOptionnel.garanties.filter(g =>
        !garantiesSouscrites.includes(g.nomTypeGarantie)
      )
    : [];

  return {
    packsProposes,
    garantiesOptionnellesProposees
  };
}

