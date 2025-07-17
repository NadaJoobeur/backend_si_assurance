// src/modules/sinistre/sinistreTimeline.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const SinistreTimeline = sequelize.define('SinistreTimeline', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroSinistre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateStatut: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'sinistre_timelines',
  timestamps: true,
});

export default SinistreTimeline;
