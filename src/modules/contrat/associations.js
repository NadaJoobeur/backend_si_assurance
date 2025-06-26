import Contrat from './contrat.model.js';
import HistoriqueContrat from './historiqueContrat.model.js';

Contrat.hasMany(HistoriqueContrat, {
  foreignKey: 'numeroContrat',
  sourceKey: 'numeroContrat',
});

HistoriqueContrat.belongsTo(Contrat, {
  foreignKey: 'numeroContrat',
  targetKey: 'numeroContrat',
});

export { Contrat, HistoriqueContrat };