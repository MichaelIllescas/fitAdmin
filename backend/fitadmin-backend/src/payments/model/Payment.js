const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Payment = sequelize.define('Payment', {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  feeTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amountPaid: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Payment;
