import Sinistre from '../sinistre/sinistre.model.js'; // ou le bon chemin si différent
import { v4 as uuidv4 } from 'uuid'; // pour générer un numeroSinistre unique

export const createSinistreService = async (payload) => {
  const numeroSinistre = `SIN-${uuidv4().split('-')[0]}`;

  // Création du sinistre
  const sinistre = await Sinistre.create({
    numeroContrat: payload.numeroContrat,
    numeroSinistre: numeroSinistre,
    numeroImmatriculation: payload.numeroImmatriculation || [],
    statut: payload.statut || 'OUVERT',
    dateSinistre: payload.dateSinistre,
    optionReparation: payload.OptionReparation || null,
    motifRejet: payload.motifRejet || null,
    lieuSinistre: payload.lieuSinistre || null,
    conducteur: payload.conducteur || null,
    typeConducteur: payload.typeConducteur || null,
    identifiantPrincipal: payload.identifiantPrincipal
  });

  return sinistre;
};


export async function listSinistres() {
  try {
    // Récupérer toutes les agences
    const devis = await Sinistre.findAll();
    return devis;
  } catch (error) {
    throw error;
  }
}


export async function deleteSinistreService (numeroSinistre){
      return await Sinistre.destroy({ where: { numeroSinistre: numeroSinistre } })

}

export const detailSinistreService = async (numeroSinistre) => {
  try {
    const sinistre = await Sinistre.findOne({
      where: { numeroSinistre }
    });

    return sinistre;
  } catch (error) {
    console.error('Erreur lors de la recherche du sinistre :', error);
    throw error;
  }
};
export const updateSinistreService = async ({ numeroSinistre, ...data }) => {
  // Supprimer manuellement "id" si présent dans data
  if ('id' in data) delete data.id;

  const [updated] = await Sinistre.update(data, {
    where: { numeroSinistre }
  });

  if (updated === 0) {
    throw new Error("Sinistre introuvable ou aucune modification effectuée.");
  }

  // Puisqu'on cherche par numeroSinistre (qui est unique), on peut faire :
  const updatedSinistre = await Sinistre.findOne({ where: { numeroSinistre } });
  return updatedSinistre;
};
