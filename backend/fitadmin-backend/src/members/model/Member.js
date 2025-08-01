const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Member = sequelize.define('Member', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Anulado'),
    defaultValue: 'Activo',
    allowNull: false,
  },

  // ✅ Asociar con la cuota seleccionada
  feeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
     model: 'FeeTypes', 
     key: 'id'  
    },
  },
});

module.exports = Member;
