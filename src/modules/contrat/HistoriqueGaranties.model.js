import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.js'

const HistoriqueGaranties = sequelize.define('HistoriqueGaranties', {
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'HistoriqueGaranties',
  timestamps: true
})

export default HistoriqueGaranties;



