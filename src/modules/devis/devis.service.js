// src/modules/devis/devis.service.js
import fs from 'fs';
import path from 'path';
import sequelize from '../../config/database.js'; // ou chemin exact selon ton arborescence

import ProfilVehicule from '../contrat/profilVehicule.model.js';
import GarantieContrat from '../contrat/garantieContrat.model.js'
import Pack from '../contrat/Pack.js'
import Devis from './devis.model.js';
import db from '../../config/database.js'; // adapte le chemin selon ton projet
import Personne from '../Personne/personne.model.js';
import Contrat from '../contrat/contrat.model.js';
// Lis packs.json une fois :
const packsEtGaranties = JSON.parse(
  fs.readFileSync(
    path.resolve('src/data/packs.json'),
    'utf-8'
  )
);
import ResultatDevis from './result_devis.model.js';


export const getPackGarantiesByNumeroContrat = async (numeroContrat) => {
  // 1. Récupérer profil
  const profil = await ProfilVehicule.findOne({ where: { numeroContrat } });
  if (!profil) return null;

  // 2. Extraire données du profil
  const ageVehicule = parseInt(profil.ageVehicule);
  const nombreChevaux = parseInt(profil.nombreChevaux);
  const nombrePlaces = parseInt(profil.nombreDePlaces);
  const bonusMalus = parseInt(profil.bonusMalus);
  const valeurVenale = parseFloat(profil.valeurVenale);
  const valeurCatalogue = parseFloat(profil.valeurCatalogue);
  console.log({
  ageVehicule,
  nombreChevaux,
  nombrePlaces,
  bonusMalus,
  valeurVenale,
  valeurCatalogue
});

  const { packs, garantiesOptionnelles } = packsEtGaranties;

  // 3. Choisir le pack de base selon ta logique
  let packChoisi;
  if (ageVehicule <= 5 && valeurCatalogue >= 50000) {
    packChoisi = packs.find(p => p.codePack === 'SERENITE');
  } else if (ageVehicule <= 10 && nombreChevaux >= 6) {
    packChoisi = packs.find(p => p.codePack === 'SECURITE');
  } else {
    packChoisi = packs.find(p => p.codePack === 'RC');
  }

  // 4. Déterminer les garanties optionnelles adaptées
  let garantiesRecommandees = [];

  // Exemple : véhicule récent et cher => plus de garanties optionnelles
  if (valeurCatalogue > 50000) {
    garantiesRecommandees.push(
      garantiesOptionnelles.find(g => g.code === 'CONDPLUS'),
      garantiesOptionnelles.find(g => g.code === 'ASSISTPLUS'),
      garantiesOptionnelles.find(g => g.code === 'VOLPART'),
      garantiesOptionnelles.find(g => g.code === 'CATPLUS')
    );
  }

  // Exemple : si usage intensif ou cheval élevé => protection moteur/électrique
  if (nombreChevaux >= 8) {
    garantiesRecommandees.push(
      garantiesOptionnelles.find(g => g.code === 'ELECTRIQUE')
    );
  }

  // Exemple : pour les véhicules anciens, proposer bris glace étendu
  if (ageVehicule > 10) {
    garantiesRecommandees.push(
      garantiesOptionnelles.find(g => g.code === 'BRGL_EXT')
    );
  }

  // Exemple : tout le monde peut vouloir Protection juridique renforcée
  garantiesRecommandees.push(
    garantiesOptionnelles.find(g => g.code === 'JURIDPLUS')
  );

  // Filtrer doublons / undefined
  garantiesRecommandees = garantiesRecommandees.filter(Boolean);

  return {
    packChoisi,
    garantiesRecommandees
  };
};


/**
 * Calcule le décompte du devis.
 * @param {Object} params
 * @param {string} params.valeurVenale - Valeur vénale (String → parseFloat)
 * @param {string} params.bonusMalus - Bonus/Malus (String → parseFloat)
 * @param {Object} params.packChoisi - Un seul pack choisi { codePack }
 * @param {Array} params.garantiesOptionnelles - [{ codeGarantieOptionnelle }]
 */
export async function calculerDecompte({ valeurVenale, bonusMalus, packChoisi, garantiesOptionnelles }) {
  // Conversion String → Nombre
  const valeurVenaleNum = parseFloat(valeurVenale);
  const bonusMalusNum = parseFloat(bonusMalus);

  if (isNaN(valeurVenaleNum) || isNaN(bonusMalusNum)) {
    throw new Error('ValeurVenale ou BonusMalus invalide');
  }

  // Vérifier pack choisi
  if (!packChoisi || !packChoisi.codePack) {
    throw new Error('Pack choisi manquant');
  }

  // Chercher le pack dans le JSON
  const packJSON = packsEtGaranties.packs.find(p => p.codePack === packChoisi.codePack);
  if (!packJSON) {
    throw new Error(`Pack ${packChoisi.codePack} introuvable dans packsEtGaranties`);
  }

  // Calculer montant du pack
  const montantPack = valeurVenaleNum * packJSON.taux;

  // Calculer montant des garanties incluses dans le pack
  let montantGarantiesPack = 0;
  packJSON.garanties.forEach(g => {
    montantGarantiesPack += g.capitalGarantie * g.taux;
  });

  // Calculer montant des garanties optionnelles filtrées
  let montantGarantiesOptionnelles = 0;

  // Filtrer uniquement les garanties optionnelles valides
  const garantiesOptionnellesFiltrees = (garantiesOptionnelles || []).filter(opt =>
    packsEtGaranties.garantiesOptionnelles.some(g => g.code === opt.codeGarantie)
  );

  garantiesOptionnellesFiltrees.forEach(opt => {
    const garantieJSON = packsEtGaranties.garantiesOptionnelles.find(
      g => g.code === opt.codeGarantie
    );

    if (!garantieJSON) {
      // Plutôt qu'une erreur bloquante, juste un avertissement dans la console
      console.warn(`Garantie optionnelle ${opt.codeGarantie} introuvable`);
      return; // skip cette garantie
    }

    montantGarantiesOptionnelles += garantieJSON.capitalMaximum * garantieJSON.taux;
  });

  // Prime nette
  const montantPrimeNette = montantPack + montantGarantiesPack + montantGarantiesOptionnelles;

  // Bonus/malus
  const montantPrimeAvecBM = montantPrimeNette * bonusMalusNum;

  // Frais, commission, taxe
  const montantCommission = montantPrimeAvecBM * 0.10; // 10%
  const montantFrais = montantPrimeAvecBM * 0.02; // 2%
  const montantTaxe = montantPrimeAvecBM * 0.19; // 19%

  const montantPrimeTotale = montantPrimeAvecBM + montantCommission + montantFrais + montantTaxe;

  return {
    montantPrimeNette,
    montantCommission,
    montantFrais,
    montantTaxe,
    montantPrimeTotale
  };
}



/* fontend */



export const createDevisService = async (payload) => {
  const { devis, garanties, profilVehicule, pack } = payload;

  // 1. Création du contrat
  const nouveauDevis = await Devis.create(devis);

  // 2. Création des garanties liées
  if (Array.isArray(garanties)) {
    const garantiesAvecContrat = garanties.map(g => ({
      ...g,
      id_devis: nouveauDevis.id,
    }));
    await GarantieContrat.bulkCreate(garantiesAvecContrat);
  }

  // 3. Création du profil véhicule lié
  if (profilVehicule && nouveauDevis.id) {
    await ProfilVehicule.create({
      ...profilVehicule,
      id_devis:nouveauDevis.id,
    });
  }

  // 4. Création du pack lié au contrat
  if (pack && pack.codePack &&  nouveauDevis.id) {
    await Pack.create({
      id_devis:nouveauDevis.id,
      codePack: pack.codePack,
    });
  }

  // 5. Calcul du décompte et sauvegarde dans ResultatDevis
  try {
    const montant = await calculerDecompte({
      valeurVenale: profilVehicule?.valeurVenale,
      bonusMalus: profilVehicule?.bonusMalus,
      packChoisi: pack,
      garantiesOptionnelles: garanties
    });

    await ResultatDevis.create({
      montantPrimeNette: montant.montantPrimeNette,
      montantComission: montant.montantCommission,
      montantFrais: montant.montantFrais,
      montantTaxe: montant.montantTaxe,
      montantPrimeTotal: montant.montantPrimeTotale,
      id_devis: nouveauDevis.id
    });
  } catch (error) {
    console.error('Erreur lors du calcul ou de l’enregistrement du résultat de devis:', error);
  }


  return nouveauDevis;
};

export async function listDevis() {
  try {
    // Récupérer toutes les agences
    const devis = await Devis.findAll();
    return devis;
  } catch (error) {
    throw error;
  }
}





export const deleteDevisService = async (id_devis) => {
  try {
    const devis = await Devis.findOne({ where: { id: id_devis } });
    if (!devis) {
      throw new Error('Contrat non trouvé');
    }
/*Dans Sequelize (et la plupart des ORM), 
une transaction est un mécanisme qui te permet d’exécuter plusieurs opérations (INSERT, UPDATE, DELETE, etc.) comme un bloc unique. 
Si une opération échoue, tout est annulé (rollback). Sinon, on valide toutes les modifications (commit).*/
    const transaction = await db.transaction();

    try {
      await GarantieContrat.destroy({ where: { id_devis }, transaction });
      await ProfilVehicule.destroy({ where: { id_devis }, transaction });
      await Pack.destroy({ where: { id_devis }, transaction });

      // ✅ Suppression du devis lui-même
      await Devis.destroy({ where: { id: id_devis }, transaction });

      await transaction.commit();

      return { success: true, message: 'Devis supprimé avec succès' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Erreur suppression devis:', error);
    throw error;
  }
};


export const getDevisDetailService = async (id_devis) => {
  console.log('🔍 Recherche devis avec id:', id_devis);

  let devis;
  try {
    devis = await Devis.findOne({
      where: db.literal(`"id" = '${id_devis}'`)
    });
    console.log('✅ devis trouvé:', devis);
  } catch (e) {
    console.error('❌ Erreur lors de la récupération du devis:', e);
    throw new Error('Erreur lors de la récupération du devis');
  }

  if (!devis) {
    throw new Error('Devis non trouvé');
  }

  let garanties = [];
  try {
    garanties = await GarantieContrat.findAll({
      where: { id_devis: String(id_devis) }
    });
    console.log('✅ Garanties trouvées:', garanties);
  } catch (e) {
    console.error('❌ Erreur lors de la récupération des garanties:', e);
    throw new Error('Erreur lors de la récupération des garanties');
  }

let profilVehicule;
try {
  const profilVehiculeArray = await ProfilVehicule.findAll({
    where: { id_devis: String(id_devis) }
  });
  profilVehicule = profilVehiculeArray[0] || null; // Prend le 1er ou null si vide
  console.log('✅ Profil véhicule trouvé:', profilVehicule);
} catch (e) {
  console.error('❌ Erreur lors de la récupération des profils véhicule:', e);
  throw new Error('Erreur lors de la récupération des profils véhicule');
}

  let resultat;
  try {
    resultat = await ResultatDevis.findOne({
      where: { id_devis: id_devis }
    });
    console.log('✅ resulat trouvé:', resultat);
  } catch (e) {
    console.error('❌ Erreur lors de la récupération du resultat devis:', e);
    throw new Error('Erreur lors de la récupération du resultat');
  }
   let pack;
  try {
    pack = await Pack.findOne({
      where: { id_devis: id_devis }
    });
    console.log('✅ pack trouvé:', pack);
  } catch (e) {
    console.error('❌ Erreur lors de la récupération du pack:', e);
    throw new Error('Erreur lors de la récupération du pack');
  }
  

  // Retourner un objet combiné
  return {
    devis,
    garanties,
    profilVehicule,
    pack,
    resultat,
  };
};
export const updateDevisService = async (id_devis, payload) => {
  const transaction = await sequelize.transaction();

  try {
    const { devis, garanties, profilVehicule, pack } = payload;

    // 1. Vérifier et mettre à jour le devis principal
    const existingDevis = await Devis.findOne({ 
      where: { id: id_devis },
      transaction
    });

    if (!existingDevis) {
      throw new Error('Devis non trouvé');
    }

    await existingDevis.update(devis, { transaction });

    // 2. Gestion des garanties (suppression + recréation)
    await GarantieContrat.destroy({ 
      where: { id_devis },
      transaction
    });

    if (garanties?.length > 0) {
      await GarantieContrat.bulkCreate(
        garanties.map(g => ({ ...g, id_devis })),
        { transaction }
      );
    }

    // 3. Mise à jour du profil véhicule
    const [profil] = await ProfilVehicule.findOrCreate({
      where: { id_devis },
      defaults: { ...profilVehicule, id_devis },
      transaction
    });

    if (!profil.isNewRecord) {
      await profil.update(profilVehicule, { transaction });
    }

    // 4. Mise à jour du pack
    const [packInstance] = await Pack.findOrCreate({
      where: { id_devis },
      defaults: { ...pack, id_devis },
      transaction
    });

    if (!packInstance.isNewRecord) {
      // Ici on force id_devis pour éviter la violation de clé étrangère
      await packInstance.update({ ...pack, id_devis }, { transaction });
    }

    // 5. Calcul et mise à jour des résultats financiers
    await ResultatDevis.destroy({ 
      where: { id_devis },
      transaction
    });

    const montant = await calculerDecompte({
      valeurVenale: profilVehicule?.valeurVenale,
      bonusMalus: profilVehicule?.bonusMalus,
      packChoisi: pack,
      garantiesOptionnelles: garanties
    });

    await ResultatDevis.create({
      montantPrimeNette: montant.montantPrimeNette,
      montantComission: montant.montantCommission,
      montantFrais: montant.montantFrais,
      montantTaxe: montant.montantTaxe,
      montantPrimeTotal: montant.montantPrimeTotale,
      id_devis,
    }, { transaction });

    // 6. Récupération des données mises à jour
    const garantiesUpdated = await GarantieContrat.findAll({ 
      where: { id_devis },
      transaction
    });

    const profilVehiculeUpdated = await ProfilVehicule.findOne({ 
      where: { id_devis },
      transaction
    });

    await transaction.commit();

    return {
      devis: existingDevis.get({ plain: true }),
      garanties: garantiesUpdated.map(g => g.get({ plain: true })),
      profilVehicule: profilVehiculeUpdated?.get({ plain: true }),
      pack: packInstance.get({ plain: true }),
      resultat: montant
    };

  } catch (error) {
    await transaction.rollback();
    console.error('Erreur lors de la mise à jour du devis:', error);
    throw error;
  }
};
export const createContratService = async (payload, id_devis) => {
  const { contrat, garanties, profilVehicule, pack } = payload;

  // Vérifier si la personne existe
  const personneExiste = await Personne.findOne({
    where: { id: contrat.numeroIdentification },
  });

  if (!personneExiste) {
    throw new Error("La personne avec ce numéro d'identification n'existe pas.");
  }

  // 1. Création du contrat avec liaison au devis
  const nouveauContrat = await Contrat.create({
    ...contrat,
    id_devis: id_devis, // <-- Ajout de la clé étrangère
  });

  // 2. Mise à jour des garanties existantes liées à ce devis
  if (Array.isArray(garanties)) {
    for (const garantie of garanties) {
      await GarantieContrat.update(
        { numeroContrat: contrat.numeroContrat },
        {
          where: {
            codeGarantie: garantie.codeGarantie, // on met à jour par ID
            id_devis: id_devis,
          },
        }
      );
    }
  }

  // 3. Mise à jour du profil véhicule existant (ajout numeroContrat + infos manquantes)
  if (profilVehicule && id_devis) {
    const existingProfil = await ProfilVehicule.findOne({ where: { id_devis } });

    if (existingProfil) {
      await existingProfil.update({
        ...profilVehicule,
        numeroContrat: contrat.numeroContrat,
      });
    } else {
      // fallback si jamais il n'existe pas (optionnel)
      await ProfilVehicule.create({
        ...profilVehicule,
        numeroContrat: contrat.numeroContrat,
        id_devis,
      });
    }
  }

  // 4. Mise à jour du pack (déjà créé avec le devis)
  if (pack && pack.codePack) {
    const existingPack = await Pack.findOne({ where: { id_devis } });

    if (existingPack) {
      await existingPack.update({
        numeroContrat: contrat.numeroContrat,
      });
    } else {
      // fallback création si besoin
      await Pack.create({
        numeroContrat: contrat.numeroContrat,
        codePack: pack.codePack,
        id_devis,
      });
    }
  }

  return nouveauContrat;
};
