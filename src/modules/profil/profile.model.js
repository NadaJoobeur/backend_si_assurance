import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.js'

const Profil = sequelize.define('Profil', {
  userId: {  // Champ userId normal, pas FK déclarée
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  employeeId: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING, // Chemin de l'image stockée
  },
  poste: {
    type: DataTypes.STRING,
  },
})

export default Profil
