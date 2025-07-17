import Personne from './personne.model.js'
import Contrat from '../contrat/contrat.model.js';

export const createPerson = async (ownerId, data) => {
  try {
    const newPerson = await Personne.create({
      ownerId,
      nom: data.nom,
      prenom: data.prenom,
      raisonSociale: data.raisonSociale,
      dateDeNaissance: data.dateDeNaissance,
      activite: data.activite,
      listeAdresse: data.listeAdresse || [],
      listeTelephone: data.listeTelephone || [],
      listeMails: data.listeMails || [],
      blackList: data.blackList || false
    })
    return newPerson
  } catch (error) {
    throw new Error('Erreur lors de la création de la personne : ' + error.message)
  }
}

export const DeletePerson = async ({ numeroIdentification }) => {
  return await Personne.destroy({ where: { id: numeroIdentification } })
}

export const ListPerson = async ({ ownerId }) => {
  return await Personne.findAll({
   
  })
}

export const DetailPerson = async (numeroIdentification) => {
  try {
    const personne = await Personne.findOne({
      where: { id: numeroIdentification },
    });

    if (!personne) {
      return null;
    }

    return {
      nom: personne.nom,
      prenom: personne.prenom,
      raisonSociale: personne.raisonSociale,
      dateDeNaissance: personne.dateDeNaissance,
      activite: personne.activite,
      listeAdresse: personne.listeAdresse || [],
      listeTelephone: personne.listeTelephone || [],
      listeMails: personne.listeMails || [],
      blackList:personne.blackList ,
    };
  } catch (error) {
    throw error;
  }
};

export const UpdatePerson = async ({ numeroIdentification, ...data }) => {
  const [updated] = await Personne.update(data, {
    where: { id: numeroIdentification }
  })
  if (updated === 0) {
    throw new Error("Personne introuvable ou aucune modification effectuée.")
  }
  const updatedPerson = await Personne.findByPk(numeroIdentification)
  return updatedPerson
}

export const CheckBlackList = async ({ numeroIdentification }) => {
  const personne = await Personne.findByPk(numeroIdentification)
  if (!personne) return null

  return { blacklist: !!personne.blackList }
}


export const CheckPersonExist = async ({ numeroIdentification }) => {
  const personne = await Personne.findByPk(numeroIdentification);
  return !!personne;  // true si trouvée, false sinon
}

export const checkPersonExistence = async (numeroIdentification, numeroContrat) => {
  try {
    const contrat = await Contrat.findOne({
      where: {
        numeroIdentification,
        numeroContrat,
      },
    });

    return contrat !== null; // true si trouvé, false sinon
  } catch (error) {
    throw new Error('Erreur lors de la recherche du contrat');
  }
};


export const modifierMoyenContact = async ({
  numeroIdentite,
  typeContact,
  typeOperation,
  nouvelleValeur,
  ancienneValeur,
  numeroRue,
  libelleRue,
  codePostal,
}) => {
  // Trouver la personne par son identifiant
  const personne = await Personne.findOne({ where: { id: numeroIdentite } });

  if (!personne) return false;

  let updateNeeded = false;
  const dataToUpdate = { ...personne.dataValues }; // copier pour modifier

  switch (typeContact) {
    case '001': // Adresse - ajout uniquement
      if (typeOperation === '01') {
        const nouvelleAdresse = {
          numRue: parseInt(numeroRue) || null,
          nomRue: libelleRue || '',
          contactParDefaut: false,
          codePostal: codePostal || '',
          libelleCodePostal: '', // tu peux adapter si tu as ce champ
          delegation: '', // idem
        };
        dataToUpdate.listeAdresse = dataToUpdate.listeAdresse || [];
        dataToUpdate.listeAdresse.push(nouvelleAdresse);
        updateNeeded = true;
      }
      break;

    case '002': // Telephone - ajout ou modification
      dataToUpdate.listeTelephone = dataToUpdate.listeTelephone || [];

      if (typeOperation === '01') {
        // Ajout téléphone
        dataToUpdate.listeTelephone.push({
          numeroTelephone: nouvelleValeur || '',
          typeTelephone: '', // pas passé en paramètre, à compléter si besoin
          contactParDefaut: false,
        });
        updateNeeded = true;
      } else if (typeOperation === '02') {
        // Modification téléphone
        const indexTel = dataToUpdate.listeTelephone.findIndex(
          (tel) => tel.numeroTelephone === ancienneValeur
        );
        if (indexTel !== -1) {
          dataToUpdate.listeTelephone[indexTel].numeroTelephone = nouvelleValeur || '';
          updateNeeded = true;
        }
      }
      break;

    case '003': // Mail - ajout ou modification
      dataToUpdate.listeMails = dataToUpdate.listeMails || [];

      if (typeOperation === '01') {
        // Ajout mail
        dataToUpdate.listeMails.push({
          adresseMail: nouvelleValeur || '',
          contactParDefaut: false,
        });
        updateNeeded = true;
      } else if (typeOperation === '02') {
        // Modification mail
        const indexMail = dataToUpdate.listeMails.findIndex(
          (mail) => mail.adresseMail === ancienneValeur
        );
        if (indexMail !== -1) {
          dataToUpdate.listeMails[indexMail].adresseMail = nouvelleValeur || '';
          updateNeeded = true;
        }
      }
      break;

    default:
      throw new Error('Type de contact inconnu');
  }

  if (!updateNeeded) return false;

  // Sauvegarder les modifications
  await personne.update(dataToUpdate);

  return true;
};


export async function verifierExistenceClientService(numeroIdentite, numeroContrat) {
  const contrat = await Contrat.findOne({
    where: {
      numeroIdentification: numeroIdentite,
      numeroContrat: numeroContrat
    }
  });

  return contrat ? true : false;
}