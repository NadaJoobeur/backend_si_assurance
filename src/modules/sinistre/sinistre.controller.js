import {createSinistreService,
  listSinistres,
  deleteSinistreService,
  detailSinistreService,
  updateSinistreService,
} from "../sinistre/sinistre.service.js"


/* Pour le front */
export const fetchAddSinistre = async (req, res, next) => {
 try {
    const payload = req.body;
    const sinistreCree = await createSinistreService(payload);
    res.status(201).json({ message: 'sinistre créé avec succès', sinistre: sinistreCree });
  } catch (error) {
    console.error('Erreur création sinistre:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du sinistre', error: error.message });
  }
};
export async function fetchListSinistre(req, res) {
  try {
    const sinistres = await listSinistres();
    res.status(200).json(sinistres);
  } catch (error) {
    console.error('Erreur lors de la récupération des sinistres:', error);
    res.status(500).json({ error: 'Impossible de récupérer la liste des sinistres' });
  }
}

export const fetchDeleteSinistre = async (req, res) => {
  const { numeroSinistre } = req.params;

  if (!numeroSinistre) {
    return res.status(400).json({ success: false, message: 'Le numéro de sinistre est requis' });
  }

  try {
    const result = await deleteSinistreService(numeroSinistre);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur suppression sinistre:', error); // <-- log ici
    res.status(500).json({ success: false, message: error.message || 'Erreur lors de la suppression du sinistre' });
  }
};


export const fetchDetailSinistre = async (req, res) => {
  try {
    console.log('req.params:', req.params);

    const { numeroSinistre } = req.params;

    if (!numeroSinistre) {
      return res.status(400).json({ success: false, message: 'Le numéro de sinistre est obligatoire.' });
    }

    const sinistre = await detailSinistreService(numeroSinistre);

    if (!sinistre) {
      return res.status(404).json({ success: false, message: 'Sinistre non trouvé.' });
    }

    return res.json({
      success: true,
      data: sinistre
    });
  } catch (error) {
    console.error('Erreur Detail Sinistre:', error);
    return res.status(500).json({ success: false, message: 'Problème technique. Impossible de retrouver le sinistre.' });
  }
};
export const fetchUpdateSinistre = async (req, res) => {
  try {
    const { numeroSinistre } = req.params
    const data = req.body

    const updated = await updateSinistreService({numeroSinistre, ...data })

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
