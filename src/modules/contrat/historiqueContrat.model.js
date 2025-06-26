import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.js'

const HistoriqueContrat = sequelize.define('HistoriqueContrat', {
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'HistoriqueContrats',
  timestamps: true
})

export default HistoriqueContrat



