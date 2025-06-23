// src/modules/contrat/contrat.service.js
import Contrat from './contrat.model.js';
import GarantieContrat from './garantieContrat.model.js';
import ProfilVehicule from './profilVehicule.model.js';


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

