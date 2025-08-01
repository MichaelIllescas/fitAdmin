const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const FeeType = sequelize.define('FeeType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  durationInDays: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = FeeType;
