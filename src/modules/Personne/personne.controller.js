import {
  createPerson as createPersonService,
  DeletePerson as deletePersonService,
  ListPerson as listPersonService,
  DetailPerson as detailPersonService,
  UpdatePerson as updatePersonService,
  CheckBlackList as checkBlackListService,
  CheckPersonExist as checkPersonExistService,
  checkPersonExistence as checkPersonExistenceService,
  modifierMoyenContact 
} from './personne.service.js'

export const createPerson = async (req, res) => {
  try {
    const { ownerId } = req.params
    const data = req.body

    if (!data.nom || !data.prenom || !data.dateDeNaissance) {
      return res.status(400).json({ message: 'Nom, prénom et date de naissance sont obligatoires.' })
    }

    const newPerson = await createPersonService(ownerId, data)
    return res.status(201).json(newPerson)
  } catch (error) {
    console.error('Erreur ajout personne:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const DeletePerson = async (req, res, next) => {
  try {
    const {numeroIdentification } = req.params
    await deletePersonService({ numeroIdentification })
    res.status(200).json({ message: 'Personne supprimée' })
  } catch (error) {
    next(error)
  }
}

export const ListPerson = async (req, res, next) => {
  try {
    const { ownerId } = req.params
    const personnes = await listPersonService({ ownerId })
    res.status(200).json(personnes)
  } catch (error) {
    next(error)
  }
}

export const DetailPerson = async (req, res) => {
  try {
    console.log('req.params:', req.params);

    const { numeroIdentification } = req.params;

    if (!numeroIdentification) {
      return res.status(400).json({ message: 'Le numéro d’identification est obligatoire.' });
    }

    const personne = await detailPersonService(numeroIdentification);

    if (!personne) {
      return res.status(204).send();
    }

    return res.json(personne);
  } catch (error) {
    console.error('Erreur DetailPerson:', error);
    return res.status(500).json({ message: 'Problème technique. Impossible de retrouver le client.' });
  }
};




export const UpdatePerson = async (req, res) => {
  try {
    const { numeroIdentification } = req.params
    const data = req.body

    const updated = await updatePersonService({ numeroIdentification, ...data })

    if (!updated) {
      return res.status(204).send() // Aucun client trouvé
    }

    return res.status(200).json({ success: true })

  } catch (error) {
    return res.status(500).json({
      message: 'Problème technique. Impossible de retrouver le client.',
      error: error.message
    })
  }
}


export const CheckBlackList = async (req, res) => {
  try {
    const { numeroIdentification } = req.params
    const result = await checkBlackListService({ numeroIdentification })

    if (!result) {
      return res.status(204).send() // Aucun client trouvé
    }

    return res.status(200).json({ blacklist: result.blacklist }) // true ou false

  } catch (error) {
    return res.status(500).json({
      message: 'Problème technique. Impossible de retrouver le client.',
      error: error.message
    })
  }
}


export const CheckPersonExist = async (req, res, next) => {
  try {
    const { numeroIdentification } = req.params;
    const exists = await checkPersonExistService({ numeroIdentification });

    // Renvoie un booléen directement, pas d'objet
    return res.status(200).json(exists === true); // garantit un booléen

  } catch (error) {
    res.status(500).json({
      message: 'Problème technique. Impossible de retrouver le client.',
      error: error.message,
    });
  }
};

export const CheckPersonExistence = async (req, res) => {
  const { numeroIdentification, numeroContrat } = req.params;

  try {
    const exists = await checkPersonExistenceService(numeroIdentification, numeroContrat);

     if (!exists) {
      // Code 204 sans corps, conforme à ta spécification
      return res.status(204).send();
    }

    return res.status(200).json(true);
  } catch (error) {
    console.error('Erreur dans CheckPersonExistence:', error.message);
    return res.status(500).json({
      message: 'Problème technique. Impossible de retrouver le client.',
    });
  }
};


export const modificationMoyenContact = async (req, res) => {
  const {
    numeroIdentite,
    typeContact,
    typeOperation,
    nouvelleValeur,
    ancienneValeur,
    numeroRue,
    libelleRue,
    codePostal,
  } = req.query;

  if (!numeroIdentite || !typeContact || !typeOperation) {
    return res.status(400).json({ message: 'Paramètres obligatoires manquants.' });
  }

  try {
    const result = await modifierMoyenContact({
      numeroIdentite,
      typeContact,
      typeOperation,
      nouvelleValeur,
      ancienneValeur,
      numeroRue,
      libelleRue,
      codePostal,
    });

    if (!result) {
      return res.status(204).json({ message: 'Aucun client trouvé.' });
    }

    return res.status(200).json(true);
  } catch (error) {
    console.error('Erreur modification moyen contact:', error);
    return res.status(500).json({
      message: 'Problème technique. Impossible de modifier le client.',
    });
  }
};
