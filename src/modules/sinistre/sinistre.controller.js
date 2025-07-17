import {createSinistreService,
  listSinistres,
  deleteSinistreService,
  detailSinistreService,
  updateSinistreService,
  getSinistresByClient,getReglementsByNumeroSinistre, getGarantiesByNumeroSinistre,getStatutsSinistre,getSinistresByClientAndProduit, getTimelineByNumeroSinistre,
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


//Nada
export const fetchSinistres = async (req, res) => {
  try {
    const { identifiantClient } = req.params;
    console.log('REQ PARAMS:', identifiantClient);

    if (!identifiantClient) {
      return res.status(400).json({ message: 'Identifiant client requis.' });
    }

    const sinistres = await getSinistresByClient(identifiantClient);
    console.log('RESULT:', sinistres);

    if (!sinistres || sinistres.length === 0) {
      return res.status(204).send();
    }

    res.status(200).json(sinistres);
  } catch (err) {
    console.error('ERR in fetchSinistres:', err);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

export const fetchReglements = async (req, res) => {
  try {
    const { numeroSinistre } = req.params;

    console.log('REQ PARAMS numeroSinistre:', numeroSinistre);

    if (!numeroSinistre) {
      return res.status(400).json({ message: 'Numero sinistre requis.' });
    }

    const reglements = await getReglementsByNumeroSinistre(numeroSinistre);
    console.log('RESULT Reglements:', reglements);

    if (!reglements || reglements.length === 0) {
      return res.status(204).send();
    }

    res.status(200).json(reglements);
  } catch (err) {
    console.error('ERR in fetchReglements:', err);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

export async function listGarantiesSinistre(req, res) {
  try {
    const numeroSinistre = req.params.numeroSinistre;

    const garanties = await getGarantiesByNumeroSinistre(numeroSinistre);

    if (!garanties) {
      return res.status(204).json({ message: "Aucun sinistre trouvé." });
    }

    if (garanties.length === 0) {
      return res.status(204).json({ message: "Aucune garantie trouvée." });
    }

    res.json(garanties);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
}

export async function getListeStatuts(req, res) {
  try {
    const statuts = await getStatutsSinistre();
    if (!statuts || statuts.length === 0) {
      return res.status(204).send();
    }
    res.json(statuts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne serveur' });
  }
}



export async function fetchSinistresParProduit(req, res) {
  const { identifiantPrincipal } = req.params;
  const { produit } = req.query;

  console.log(`>>> fetchSinistres: identifiantPrincipal=${identifiantPrincipal}, produit=${produit}`);

  try {
    const sinistres = await getSinistresByClientAndProduit(identifiantPrincipal, produit);

    if (!sinistres || sinistres.length === 0) {
      return res.status(204).send();
    }

    const result = sinistres.map(s => ({
      numeroContrat: s.numeroContrat,
      numeroSinistre: s.numeroSinistre,
      numeroImmatriculation: s.numeroImmatriculation,
      statut: s.statut,
      dateSinistre: s.dateSinistre,
      optionReparation: s.optionReparation,
      motifRejet: s.motifRejet,
      lieuSinistre: s.lieuSinistre,
      conducteur: s.conducteur,
      typeConducteur: s.typeConducteur
    }));

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne serveur' });
  }
}

export async function getTimeline(req, res) {
  const { numeroSinistre } = req.params;
  try {
    const timeline = await getTimelineByNumeroSinistre(numeroSinistre);
    if (!timeline || timeline.length === 0) {
      return res.status(204).send();
    }
    res.json(timeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne serveur' });
  }
}