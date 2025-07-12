import app from './src/core/app.js';
import { port } from './src/config/env.js';
import sequelize from './src/config/database.js';  // ton instance Sequelize
import './src/modules/contrat/associations.js';
import './src/modules/devis/devis.model.js'
import './src/modules/agence/agence.model.js';
import './src/modules/contrat/contrat.model.js';
import './src/modules/devis/result_devis.model.js';
import './src/modules/paiement/paiement.model.js';
// Synchronisation des tables avant de démarrer le serveur
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
  