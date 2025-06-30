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


export async function calculerDecompte(numeroContrat) {
  // 1️ Extraire ProfilVehicule
  const profil = await ProfilVehicule.findOne({ where: { numeroContrat } });
  if (!profil) throw new Error('Profil véhicule introuvable');

  const valeurVenale = parseFloat(profil.valeurVenale);
  const bonusMalus = parseFloat(profil.bonusMalus);

  // 2️ Récup TOUS les packs choisis
  const packsChoisis = await Pack.findAll({ where: { numeroContrat } });
  if (!packsChoisis || packsChoisis.length === 0) throw new Error('Aucun pack choisi');

  let montantPacks = 0;
  let montantGarantiesPack = 0;

  packsChoisis.forEach(packChoisi => {
    const packJSON = packsEtGaranties.packs.find(p => p.codePack === packChoisi.codePack);
    if (!packJSON) throw new Error(`Pack ${packChoisi.codePack} introuvable dans packsEtGaranties`);

    // Ajouter taux du pack principal (si tu veux l'utiliser)
    montantPacks += valeurVenale * packJSON.taux;

    // Ajouter toutes les garanties du pack
    packJSON.garanties.forEach(g => {
      montantGarantiesPack += g.capitalGarantie * g.taux;
    });
  });

  // 3️ Récup garanties optionnelles effectivement souscrites
  const garantiesOptionnelles = await GarantieContrat.findAll({ where: { numeroContrat } });

  let montantGarantieOptionnelle = 0;
  garantiesOptionnelles.forEach(g => {
    const garantieJSON = packsEtGaranties.garantiesOptionnelles.find(opt => opt.code === g.codeGarantie);
    if (garantieJSON) {
      montantGarantieOptionnelle += garantieJSON.capitalMaximum * garantieJSON.taux;
    }
  });

  // 4️ Calculer Prime Nette
  const montantPrimeNette = montantPacks + montantGarantiesPack + montantGarantieOptionnelle;

  // 5️ Appliquer bonus/malus
  const montantPrimeAvecBM = montantPrimeNette * bonusMalus;

  // 6️ Frais, commission, taxe
  const montantCommission = montantPrimeAvecBM * 0.10; // 10% commission
  const montantFrais = montantPrimeAvecBM * 0.02; // 2% frais
  const montantTaxe = montantPrimeAvecBM * 0.19; // TVA 19%

  const montantPrimeTotale = montantPrimeAvecBM + montantCommission + montantFrais + montantTaxe;

  return {
    montantCommission,
    montantFrais,
    montantPrimeNette,
    montantTaxe,
    montantPrimeTotale
  };
}
