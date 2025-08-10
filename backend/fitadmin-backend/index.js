const sequelize = require('./config/database');
const memberController = require('./src/members/controller/member.controller');
const feeTypeController = require('./src/feeTypes/controller/feeType.controller');
const assistanceController = require('./src/assistances/controller/assistance.controller');
const paymentController = require('./src/payments/controller/payment.controller');
const expenseController = require('./src/expenses/controller/expense.controller');
const reportController = require('./src/reports/controller/report.controller');
const Assistance = require('./src/assistances/model/Assistance');

function invokeController(controller, req = {}) {
  return new Promise((resolve, reject) => {
    const res = {
      status: () => res,
      json: data => resolve(data),
      send: data => resolve(data),
    };
    Promise.resolve(controller(req, res)).catch(reject);
  });
}

async function initDatabase() {
  await sequelize.sync();
}

module.exports = {
  initDatabase,
  members: {
    register: data => invokeController(memberController.createMember, { body: data }),
    list: () => invokeController(memberController.getAllMembers),
    search: query => invokeController(memberController.searchMember, { query: { query } }),
    update: (id, data) => invokeController(memberController.updateMember, { params: { id }, body: data }),
    delete: id => invokeController(memberController.deleteMember, { params: { id } }),
  },
  feeTypes: {
    register: data => invokeController(feeTypeController.registerFeeType, { body: data }),
    list: () => invokeController(feeTypeController.getAllFeeTypes),
    update: (id, data) => invokeController(feeTypeController.updateFeeType, { params: { id }, body: data }),
    delete: id => invokeController(feeTypeController.deleteFeeType, { params: { id } }),
  },
  assistances: {
    register: data => invokeController(assistanceController.registerAssistance, { body: data }),
    list: () => invokeController(assistanceController.getAllAssistances),
    byMember: id => invokeController(assistanceController.getAssistancesByMember, { params: { memberId: id } }),
    delete: id => invokeController(assistanceController.deleteAssistance, { params: { id } }),
    byDate: date => invokeController(assistanceController.getAssistancesByDate, { params: { date } }),
    update: (id, data) => Assistance.update(data, { where: { id } }),
    annul: id => Assistance.update({ status: 'ANULADA' }, { where: { id } }),
  },
  payments: {
    list: () => invokeController(paymentController.getAllPayments),
    register: data => invokeController(paymentController.registerPayment, { body: data }),
    update: (id, data) => invokeController(paymentController.updatePayment, { params: { id }, body: data }),
    delete: id => invokeController(paymentController.deletePayment, { params: { id } }),
    searchMember: query => invokeController(paymentController.searchMemberWithLastPayment, { query: { query } }),
    search: query => invokeController(paymentController.searchPaymentsByMember, { query: { query } }),
  },
  expenses: {
    register: data => invokeController(expenseController.createExpense, { body: data }),
    list: () => invokeController(expenseController.getAllExpenses),
    getById: id => invokeController(expenseController.getExpenseById, { params: { id } }),
    update: (id, data) => invokeController(expenseController.updateExpense, { params: { id }, body: data }),
    delete: id => invokeController(expenseController.deleteExpense, { params: { id } }),
  },
  reports: {
    dailyIncome: date => invokeController(reportController.getDailyIncomeByDate, { query: { date } }),
    monthlyIncomes: year => invokeController(reportController.getMonthlyIncomes, { query: { year } }),
    monthlyExpenses: year => invokeController(reportController.getMonthlyExpenses, { query: { year } }),
    annualProfit: () => invokeController(reportController.getAnnualProfit),
    monthly: year => invokeController(reportController.getMonthlySummary, { query: { year } }),
  },
};
