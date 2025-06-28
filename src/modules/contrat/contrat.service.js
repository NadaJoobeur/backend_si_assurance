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
import Personne from '../Personne/personne.model.js';
import { Op } from 'sequelize';
import db from '../../config/database.js'; // adapte le chemin selon ton projet

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
  // Charger et parser le JSON complet (objet avec packs et garantiesOptionnelles)
  const data = fs.readFileSync(path.resolve('./src/data/packs.json'), 'utf-8');
  const packsJson = JSON.parse(data);

  const packs = packsJson.packs; // tableau des packs principaux
  const garantiesOptionnelles = packsJson.garantiesOptionnelles; // tableau garanties optionnelles

  // Chercher le pack choisi par le client dans la BDD
  const packClient = await Pack.findOne({ where: { numeroContrat } });
  const codePackChoisi = packClient?.codePack;

  if (!codePackChoisi) {
    // Pas de pack choisi => proposer tous les packs + toutes les garanties optionnelles
    return {
      packsProposes: packs,
      garantiesOptionnellesProposees: garantiesOptionnelles
    };
  }

  // Packs proposés = tous les packs sauf celui choisi
  const packsProposes = packs.filter(pack => pack.codePack !== codePackChoisi);

  // Garanties déjà souscrites par le client
  const garantiesClient = await GarantieContrat.findAll({
    where: { numeroContrat },
    attributes: ['libelleGarantie']
  });
  const garantiesSouscrites = garantiesClient.map(g => g.libelleGarantie);

  // Garanties optionnelles proposées = garanties optionnelles non déjà souscrites
  const garantiesOptionnellesProposees = garantiesOptionnelles.filter(g =>
    !garantiesSouscrites.includes(g.libelle)
  );

  return {
    packsProposes,
    garantiesOptionnellesProposees
  };
}

/* fontend */



export const createContratService = async (payload) => {
  const { contrat, garanties, profilVehicule, pack } = payload;

  // Vérifier si la personne existe
  const personneExiste = await Personne.findOne({
    where: { id: contrat.numeroIdentification },
  });

  if (!personneExiste) {
    throw new Error("La personne avec ce numéro d'identification n'existe pas.");
  }

  // 1. Création du contrat
  const nouveauContrat = await Contrat.create(contrat);

  // 2. Création des garanties liées
  if (Array.isArray(garanties)) {
    const garantiesAvecContrat = garanties.map(g => ({
      ...g,
      numeroContrat: contrat.numeroContrat,
    }));
    await GarantieContrat.bulkCreate(garantiesAvecContrat);
  }

  // 3. Création du profil véhicule lié
  if (profilVehicule && contrat.numeroContrat) {
    await ProfilVehicule.create({
      ...profilVehicule,
      numeroContrat: contrat.numeroContrat,
    });
  }

  // 4. Création du pack lié au contrat
  if (pack && pack.codePack && contrat.numeroContrat) {
    await Pack.create({
      numeroContrat: contrat.numeroContrat,
      codePack: pack.codePack,
    });
  }

  return nouveauContrat;
};



export const getContratsByOwnerId = async (ownerId) => {
  const ownerIdInt = parseInt(ownerId, 10);
  if (isNaN(ownerIdInt)) throw new Error("ownerId invalide");

  const personnes = await Personne.findAll({
    where: { ownerId: ownerIdInt },
    attributes: ['id'],
  });

  const ids = personnes.map(p => p.id.toString());

  if (ids.length === 0) return [];

  const contrats = await Contrat.findAll({
    where: {
      numeroIdentification: {
        [Op.in]: ids,
      },
    },
  });

  return contrats;
};

export const deleteContratService = async (numeroContrat) => {
  try {
    const contrat = await Contrat.findOne({ where: { numeroContrat:numeroContrat } });
    if (!contrat) {
      throw new Error('Contrat non trouvé');
    }

    const transaction = await db.transaction();

    try {
      await GarantieContrat.destroy({ where: { numeroContrat }, transaction });
      await ProfilVehicule.destroy({ where: { numeroContrat }, transaction });
      await Contrat.destroy({ where: { numeroContrat }, transaction });

      await transaction.commit();

      return { success: true, message: 'Contrat supprimé avec succès' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Erreur suppression contrat:', error);
    throw error;
  }
};
export const getContratDetailService = async (numeroContrat) => {
  // Récupérer le contrat principal
  const contrat = await Contrat.findOne({
    where: { numeroContrat: String(numeroContrat) }
  })

  if (!contrat) {
    throw new Error('Contrat non trouvé')
  }

  // Récupérer les garanties liées
  const garanties = await GarantieContrat.findAll({
    where: { numeroContrat: String(numeroContrat) }
  })

  // Récupérer les profils véhicule liés
  const profilVehicule = await ProfilVehicule.findAll({
    where: { numeroContrat: String(numeroContrat) }
  })

  // Retourner un objet combiné
  return {
    contrat,
    garanties,
    profilVehicule
  }
}


export const updateContrat1 = async (numeroContrat, payload) => {
  const { contrat, garanties, profilVehicule } = payload;

  // Trouver le contrat existant
  const existingContrat = await Contrat.findOne({ where: { numeroContrat } });
  if (!existingContrat) return null;

  // Mettre à jour le contrat principal
  await existingContrat.update(contrat);

  // Supprimer les garanties existantes
  await GarantieContrat.destroy({ where: { numeroContrat } });

  // Créer les nouvelles garanties
  if (Array.isArray(garanties) && garanties.length > 0) {
    const garantiesWithNumero = garanties.map(g => ({ ...g, numeroContrat }));
    await GarantieContrat.bulkCreate(garantiesWithNumero);
  }

  // Mettre à jour ou créer profil véhicule
  const existingProfil = await ProfilVehicule.findOne({ where: { numeroContrat } });
  if (existingProfil) {
    await existingProfil.update(profilVehicule);
  } else {
    await ProfilVehicule.create({ ...profilVehicule, numeroContrat });
  }

  // Charger les données liées séparément (pas d'include)
  const garantiesUpdated = await GarantieContrat.findAll({ where: { numeroContrat } });
  const profilsVehiculeUpdated = await ProfilVehicule.findAll({ where: { numeroContrat } });

  // Construire manuellement l'objet complet à retourner
  return {
    ...existingContrat.get({ plain: true }),
    garanties: garantiesUpdated.map(g => g.get({ plain: true })),
    profilsVehicule: profilsVehiculeUpdated.map(p => p.get({ plain: true })),
  };
};
