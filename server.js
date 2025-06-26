import app from './src/core/app.js';
import { port } from './src/config/env.js';
import sequelize from './src/config/database.js';  // ton instance Sequelize
import './src/modules/contrat/associations.js';

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
  