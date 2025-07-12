// src/modules/contrat/contrat.controller.js
import { genresVehicule } from './genresVehicule.js';

import { getPackGarantiesByNumeroContrat,
   calculerDecompte,
   createDevisService,
   listDevis ,
   deleteDevisService,
   getDevisDetailService,
   updateDevisService,
  createContratService,}
 from '../devis/devis.service.js';

export const getPackGaranties = async (req, res, next) => {
  try {
    const { numeroContrat } = req.params;

    const result = await getPackGarantiesByNumeroContrat(numeroContrat);

    if (!result || !result.packChoisi) {
      return res.status(204).json({ message: 'Aucun pack trouvé' });
    }

    res.json({
      codePack: result.packChoisi.codePack,
      nomPack: result.packChoisi.nomPack,
      descriptionPack: result.packChoisi.descriptionPack,
      codeOffre: result.packChoisi.codeOffre,
      garanties: result.packChoisi.garanties,
      garantiesOptionnelles: result.garantiesRecommandees
    });

  } catch (error) {
    next(error);
  }
};


export const getDecompteDevis = async (req, res) => {
  try {
    const {valeurVenale,
      bonusMalus,
      packChoisi,
      garantiesOptionnelles} = req.body

    //  Appel avec les paramètres attendus
    const resultat = await calculerDecompte({
      valeurVenale,
      bonusMalus,
      packChoisi,
      garantiesOptionnelles
    });

    res.status(200).json({
      success: true,
      data: resultat
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* Pour le front */
export const fetchAddDevis = async (req, res, next) => {
 try {
    const payload = req.body;
    const devisCree = await createDevisService(payload);
    res.status(201).json({ message: 'Devis créé avec succès', devis: devisCree });
  } catch (error) {
    console.error('Erreur création devis:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du devis', error: error.message });
  }
};

export async function fetchListDevis(req, res) {
  try {
    const devis = await listDevis();
    res.status(200).json(devis);
  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    res.status(500).json({ error: 'Impossible de récupérer la liste des deivs' });
  }
}

export const fetchDeleteDevis = async (req, res) => {
  const { id_devis } = req.params;

  if (!id_devis) {
    return res.status(400).json({ success: false, message: 'Le numéro de devis est requis' });
  }

  try {
    const result = await deleteDevisService(id_devis);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur suppression devis:', error); // <-- log ici
    res.status(500).json({ success: false, message: error.message || 'Erreur lors de la suppression du devis' });
  }
};


export const fetchDtailDevis = async (req, res) => {
  const { id_devis } = req.params;

  if (!id_devis) {
    return res.status(400).json({
      success: false,
      message: 'Numéro de devis requis'
    });
  }

  try {
    const result = await getDevisDetailService(id_devis);
    console.log("result",result)
    return res.status(200).json({
      success: true,
      data: result, // contient contrat, garanties et profilsVehicule
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération du devis'
    });
  }
};

export const fetchUpdateDevis = async (req, res) => {
  try {
    const { id_devis } = req.params;
    const payload = req.body;

    if (! id_devis) {
      return res.status(400).json({ success: false, message: 'Numéro devis requis' });
    }

    const updatedDevis = await updateDevisService( id_devis, payload);

    if (!updatedDevis) {
      return res.status(404).json({ success: false, message: 'Devis non trouvé' });
    }

    res.json({ success: true, data: updatedDevis });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du devis:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};


export const fetchCreateContrat = async (req, res) => {
  try {
    const { id_devis } = req.params;
    const payload = req.body;
    
    console.log(payload);

    const contratCree = await createContratService(payload,id_devis);

    res.status(201).json({ 
      message: 'Contrat créé avec succès', 
      contrat: contratCree 
    });
  } catch (error) {
    console.error('Erreur création contrat:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la création du contrat', 
      error: error.message 
    });
  }
};

//nada

export const getGenresVehicule = (req, res) => {
  res.status(200).json(genresVehicule);
};