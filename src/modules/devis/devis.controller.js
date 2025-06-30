// src/modules/contrat/contrat.controller.js

import { getPackGarantiesByNumeroContrat, calculerDecompte } from '../devis/devis.service.js';

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