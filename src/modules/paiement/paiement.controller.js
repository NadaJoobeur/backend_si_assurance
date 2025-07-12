// src/modules/paiement/paiement.controller.js
import {createPaiement, deletePaiement, createPaiement1, getPaiementsByIdentificationClient,getPaiementsByNumeroContrat } from './paiement.service.js';
import Paiement from './paiement.model.js';

export const fetchcreatePaiement = async (req, res) => {
  try {
    const {
      codeAgence,
      transactionDate,
      orderId,
      orderNumber,
      cardholderName,
      depositAmount,
      currency,
      listeQuittances,
    } = req.body;

    // Validation simple
    if (!codeAgence || !transactionDate || !orderId || !orderNumber || !depositAmount || !currency || !listeQuittances) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    const paiement = await createPaiement({
      codeAgence,
      transactionDate,
      orderId,
      orderNumber,
      cardholderName,
      depositAmount,
      currency,
      listeQuittances,
    });

    return res.status(201).json({ message: 'Paiement créé avec succès', paiement });
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la création du paiement' });
  }
};

export const getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    return res.status(200).json(paiements);
  } catch (error) {
    console.error('Erreur lors de la récupération des paiements:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des paiements' });
  }
};

export const fetchdeletePaiement = async (req, res) => {
  const { id } = req.params;

  try {
    await deletePaiement(id);
    res.status(200).json({ message: 'Paiement supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du paiement.' });
  }
};


export const fetchPaiementById = async (req, res) => {
  const { id } = req.params;

  try {
    const paiement = await Paiement.findByPk(id); // PAS de include !
    if (!paiement) {
      return res.status(404).json({ message: 'Paiement non trouvé.' });
    }
    res.status(200).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


//Encaissement
export const handleCreatePaiement = async (req, res) => {
  try {
    const payload = req.body;

    const paiement = await createPaiement1(payload);

    res.status(201).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const handleGetPaiementsByIdentificationClient = async (req, res) => {
  try {
    const { identificationClient } = req.params;

    const paiements = await getPaiementsByIdentificationClient(identificationClient);

    res.status(200).json(paiements);
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Aucun paiement trouvé',
    });
  }
};


export const handleGetPaiementsByNumeroContrat = async (req, res) => {
  const { numeroContrat } = req.params;

  try {
    const paiements = await getPaiementsByNumeroContrat(numeroContrat);

    if (paiements.length === 0) {
      return res.status(404).json({
        message: `Aucun paiement trouvé pour le numéro de contrat : ${numeroContrat}`
      });
    }

    res.status(200).json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération.' });
  }
};