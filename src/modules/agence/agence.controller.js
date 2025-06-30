// src/modules/agence/agence.controller.js
import { findAgencesByNumeroIdentifiant } from './agence.service.js';

export const getAgencesClient = async (req, res) => {
  try {
    const numeroIdentifiant = req.params.numeroIdentifiant;

    const agences = await findAgencesByNumeroIdentifiant(numeroIdentifiant);

    res.status(200).json(agences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
