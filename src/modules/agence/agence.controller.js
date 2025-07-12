// src/modules/agence/agence.controller.js
import { findAgencesByNumeroIdentifiant } from './agence.service.js';
import { createAgence, listAgences, deleteAgenceByCode ,updateAgenceByCode,getAgenceDetails,getAllAgences } from './agence.service.js';


export async function createAgenceController(req, res) {
  try {
    const agenceData = req.body;
    const newAgence = await createAgence(agenceData);
    res.status(201).json({
      message: 'Agence créée avec succès',
      agence: newAgence
    });
  } catch (error) {
    console.error('Erreur création agence:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'agence' });
  }
}


export async function ListAgenceController(req, res) {
  try {
    const agences = await listAgences();
    res.status(200).json(agences);
  } catch (error) {
    console.error('Erreur lors de la récupération des agences:', error);
    res.status(500).json({ error: 'Impossible de récupérer la liste des agences' });
  }
}


export async function DeleteAgenceController(req, res) {
  const { code_agence } = req.params;

  try {
    const deleted = await deleteAgenceByCode(code_agence);

    if (deleted === 0) {
      return res.status(404).json({ message: `Aucune agence trouvée avec le code : ${code_agence}` });
    }

    res.status(200).json({ message: `Agence avec le code ${code_agence} supprimée avec succès.` });
  } catch (error) {
    console.error('Erreur suppression agence:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'agence' });
  }
}


export async function UpdateAgenceController(req, res) {
  const { code_agence } = req.params;
  const dataToUpdate = req.body;

  try {
    const updatedAgence = await updateAgenceByCode(code_agence, dataToUpdate);

    if (!updatedAgence) {
      return res.status(404).json({ message: `Agence avec le code ${code_agence} introuvable.` });
    }

    return res.status(200).json({
      message: `Agence mise à jour avec succès.`,
      agence: updatedAgence
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’agence:', error);
    return res.status(500).json({ error: 'Erreur interne lors de la mise à jour' });
  }
}


export async function DtailAgenceController(req, res) {
  const { code_agence } = req.params;

  try {
    const agence = await getAgenceDetails(code_agence);

    if (!agence) {
      return res.status(404).json({
        success: false,
        message: `Aucune agence trouvée avec le code : ${code_agence}`
      });
    }

    return res.status(200).json({
      success: true,
      data: agence
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails agence :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne lors de la récupération de l\'agence'
    });
  }
}

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


//Nada

export async function fetchgetBranches(req, res) {
  try {
    const { codeAgence } = req.params;
    const branches = await getBranches();
    if (!branches || branches.length === 0) {
      return res.status(204).send();
    }
    res.status(200).json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne serveur' });
  }
}


// GET avec agence
export const getBranchesByAgence = async (req, res) => {
  try {
    const { codeAgence } = req.params;
    const branches = await getBranchesByCodeAgence(codeAgence);
    if (branches.length === 0) {
      return res.status(204).json({ message: 'Aucune branche trouvée.' });
    }
    res.json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne serveur.' });
  }
};



export const fetchAllOffres = async (req, res) => {
  try {
    const offres = await getAllOffres();
    if (offres.length === 0) {
      return res.status(204).send();
    }
    return res.status(200).json(offres);
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({ message: "Erreur interne serveur" });
  }
};


export const fetchOffresByCodeBranche = async (req, res) => {
  try {
    const { codeBranche } = req.params;
    const offres = await getOffresByCodeBranche(codeBranche);
    if (offres.length === 0) {
      return res.status(204).send();
    }
    return res.status(200).json(offres);
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export const getAllAgencesAss = async (req, res) => {
  try {
    console.log('👉 Début getAllAgences');
    const agences = await getAllAgences();
    console.log('✅ Résultat agences:', agences);
    res.status(200).json(agences);
  } catch (error) {
    console.error('Erreur getAllAgences:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des agences.' });
  }
};