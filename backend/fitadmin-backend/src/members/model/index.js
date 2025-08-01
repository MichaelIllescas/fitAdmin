const sequelize = require('../../../config/database'); 
const Member = require('../model/Member');
const FeeType = require('../../feeTypes/model/FeeType');
const Payment = require('../../payments/model/Payment');
const Assistance = require('../../assistances/model/Assistance');

// Relaciones
Member.belongsTo(FeeType, { foreignKey: 'feeId', as: 'feeType' });
FeeType.hasMany(Member, { foreignKey: 'feeId' });

Payment.belongsTo(Member, { foreignKey: 'memberId', as: 'member', onDelete: 'CASCADE' });
Member.hasMany(Payment, { foreignKey: 'memberId', as: 'payments', onDelete: 'CASCADE', hooks: true });

Payment.belongsTo(FeeType, { foreignKey: 'feeTypeId', as: 'feeType' });
FeeType.hasMany(Payment, { foreignKey: 'feeTypeId' });

Assistance.belongsTo(Member, { foreignKey: 'memberId', as: 'member', onDelete: 'CASCADE' });
Member.hasMany(Assistance, { foreignKey: 'memberId', as: 'assistances', onDelete: 'CASCADE', hooks: true });

module.exports = {
  sequelize,
  Member,
  FeeType,
  Payment,
  Assistance
};
