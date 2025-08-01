const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');


const Assistance = sequelize.define('Assistance', {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING, // ← hora legible como '14:32'
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Assistance
