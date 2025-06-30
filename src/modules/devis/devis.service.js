// src/modules/devis/devis.service.js
import fs from 'fs';
import path from 'path';

import ProfilVehicule from '../contrat/profilVehicule.model.js';
import GarantieContrat from '../contrat/garantieContrat.model.js'
import Pack from '../contrat/Pack.js'

// Lis packs.json une fois :
const packsEtGaranties = JSON.parse(
  fs.readFileSync(
    path.resolve('src/data/packs.json'),
    'utf-8'
  )
);


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
  //  Conversion String → Nombre
  const valeurVenaleNum = parseFloat(valeurVenale);
  const bonusMalusNum = parseFloat(bonusMalus);

  if (isNaN(valeurVenaleNum) || isNaN(bonusMalusNum)) {
    throw new Error('ValeurVenale ou BonusMalus invalide');
  }

  //  Vérifier pack choisi
  if (!packChoisi || !packChoisi.codePack) {
    throw new Error('Pack choisi manquant');
  }

  //  Chercher le pack dans le JSON
  const packJSON = packsEtGaranties.packs.find(p => p.codePack === packChoisi.codePack);
  if (!packJSON) {
    throw new Error(`Pack ${packChoisi.codePack} introuvable dans packsEtGaranties`);
  }

  //  Calculer montant du pack
  const montantPack = valeurVenaleNum * packJSON.taux;

  //  Calculer montant des garanties incluses dans le pack
  let montantGarantiesPack = 0;
  packJSON.garanties.forEach(g => {
    montantGarantiesPack += g.capitalGarantie * g.taux;
  });

  //  Calculer montant des garanties optionnelles
  let montantGarantiesOptionnelles = 0;
  garantiesOptionnelles?.forEach(opt => {
    const garantieJSON = packsEtGaranties.garantiesOptionnelles.find(
      g => g.code === opt.codeGarantieOptionnelle
    );
    if (!garantieJSON) {
      throw new Error(`Garantie optionnelle ${opt.codeGarantieOptionnelle} introuvable`);
    }
    montantGarantiesOptionnelles += garantieJSON.capitalMaximum * garantieJSON.taux;
  });

  //  Prime nette
  const montantPrimeNette = montantPack + montantGarantiesPack + montantGarantiesOptionnelles;

  //  Bonus/malus
  const montantPrimeAvecBM = montantPrimeNette * bonusMalusNum;

  //  Frais, commission, taxe
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
