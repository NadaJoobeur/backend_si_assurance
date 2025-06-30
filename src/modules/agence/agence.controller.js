import { createAgence, listAgences, deleteAgenceByCode ,updateAgenceByCode,getAgenceDetails } from './agence.service.js';

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

