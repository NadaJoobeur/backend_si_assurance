// src/modules/contrat/contrat.controller.js
import { getContratsClient, getProduitsClient,getGarantiesContrat, getVehiculesParContrat , createContratService,getContratsByOwnerId,deleteContratService,getContratDetailService, updateContrat} from './contrat.service.js';

export const fetchContratsClient = async (req, res, next) => {
  try {
    console.log('[DEBUG] Requête reçue');

    const numeroIdentification = req.params.numeroIdentification;
    const { etatContrat, echeance } = req.query;
    
    if (!numeroIdentification || !etatContrat) {
    return res.status(400).json({ message: 'Paramètres requis manquants.' });
    }
   
    const contrats = await getContratsClient({ numeroIdentification, etatContrat, echeance });

    if (!contrats.length) {
      return res.status(204).send(); // No Content
    }

    return res.status(200).json(contrats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne serveur' });
  }
};

export const fetchProduitsClient = async (req, res) => {
  const { numeroIdentification } = req.params;

  try {
    const produits = await getProduitsClient(numeroIdentification);

    if (!produits || produits.length === 0) {
      return res.status(204).send(); // Aucun produit trouvé
    }

    return res.status(200).json(produits);
  } catch (error) {
    console.error('Erreur serveur (produits client) :', error);
    return res.status(500).json({ message: 'Erreur interne serveur' });
  }
};


export const fetchGarantiesContrat = async (req, res) => {
  const { numeroIdentifiant } = req.params;
  const { numeroContrat } = req.query;

  try {
    if (!numeroContrat) {
      return res.status(400).json({ message: 'Le numéro de contrat est requis.' });
    }

    const garanties = await getGarantiesContrat(numeroContrat);

    if (!garanties || garanties.length === 0) {
      return res.status(204).send();
    }

    return res.status(200).json(garanties);
  } catch (error) {
    console.error('[ERREUR GARANTIES CONTRAT]', error);
    return res.status(500).json({ message: 'Erreur interne serveur' });
  }
};


export const fetchVehiculeParContrat = async (req, res,next) => {
   const { numeroContrat } = req.params;
  try {
    const vehicules = await getVehiculesParContrat(numeroContrat);

    if (!vehicules || vehicules.length === 0) {
      // Aucun véhicule trouvé → 204
      return res.status(204).send(); // No Content
    }

    // Sinon, renvoyer la liste
    return res.status(200).json(vehicules);
  } catch (error) {
    // Erreur technique inattendue
    console.error('Erreur lors de la récupération des véhicules :', error);
    return res.status(500).json({
      message: 'Problème technique. Aucun véhicule trouvé',
      error: error.message,
    });
  }
};
 



/* Pour le front */
export const fetchAddContrat = async (req, res, next) => {
 try {
    const payload = req.body;
    const contratCree = await createContratService(payload);
    res.status(201).json({ message: 'Contrat créé avec succès', contrat: contratCree });
  } catch (error) {
    console.error('Erreur création contrat:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du contrat', error: error.message });
  }
};


export const fetchListContrat = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const contrats = await getContratsByOwnerId(ownerId);
    res.status(200).json(contrats);
  } catch (error) {
    console.error("Erreur fetchListContrat:", error);
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

export const fetchDeleteContrat = async (req, res) => {
  const { numeroContrat } = req.params;

  if (!numeroContrat) {
    return res.status(400).json({ success: false, message: 'Le numéro de contrat est requis' });
  }

  try {
    const result = await deleteContratService(numeroContrat);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur suppression contrat:', error); // <-- log ici
    res.status(500).json({ success: false, message: error.message || 'Erreur lors de la suppression du contrat' });
  }
};


export const fetchDtailContrat = async (req, res) => {
  const { numeroContrat } = req.params;

  if (!numeroContrat) {
    return res.status(400).json({
      success: false,
      message: 'Numéro de contrat requis'
    });
  }

  try {
    const result = await getContratDetailService(numeroContrat);
    return res.status(200).json({
      success: true,
      data: result, // contient contrat, garanties et profilsVehicule
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération du contrat'
    });
  }
};

export const fetchUpdateContrat = async (req, res) => {
  try {
    const { numeroContrat } = req.params;
    const payload = req.body;

    if (!numeroContrat) {
      return res.status(400).json({ success: false, message: 'Numéro contrat requis' });
    }

    const updatedContrat = await updateContrat(numeroContrat, payload);

    if (!updatedContrat) {
      return res.status(404).json({ success: false, message: 'Contrat non trouvé' });
    }

    res.json({ success: true, data: updatedContrat });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contrat:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};