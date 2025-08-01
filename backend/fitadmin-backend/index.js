
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const memberRoutes = require('./src/members/routes/member.routes');
const expenseRoutes = require('./src/expenses/routes/expense.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const feeTypeRoutes = require('./src/feeTypes/routes/feeTypes.routes');
const paymentRoutes = require('./src/payments/routes/payment.routes');
const assistanceRoutes = require('./src/assistances/routes/assistances.routes');
const reportRoutes = require('./src/reports/routes/report.routes');

const app = express();
const PORT = 3001; // podés cambiar el puerto si querés

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas

// Members
app.use('/api/members', memberRoutes);

// FeeTypes
app.use('/api/fee-types', feeTypeRoutes);

// Payments
app.use('/api/payments', paymentRoutes);

// Assistances
app.use('/api/assistances', assistanceRoutes);

// Expenses
app.use('/api/expenses', expenseRoutes);

// Reports
app.use('/api/reports', reportRoutes);





app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sincronizar base de datos y levantar servidor
sequelize.sync() // usa alter: true para desarrollo (ajusta la tabla automáticamente)
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
