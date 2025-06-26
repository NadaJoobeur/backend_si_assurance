// src/modules/contrat/contrat.service.js
import Contrat from './contrat.model.js';
import GarantieContrat from './garantieContrat.model.js';
import ProfilVehicule from './profilVehicule.model.js';
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




/* fontend */


export const createContratService = async (payload) => {
  const { contrat, garanties, profilVehicule } = payload;

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


export const updateContrat = async (numeroContrat, payload) => {
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
