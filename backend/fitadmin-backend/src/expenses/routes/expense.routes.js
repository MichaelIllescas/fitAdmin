const express = require('express');
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require('../controller/expense.controller');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Endpoints para gestionar gastos
 */

/**
 * @swagger
 * /api/expenses/register:
 *   post:
 *     summary: Registrar un nuevo gasto
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - date
 *             properties:
 *               description:
 *                 type: string
 *                 example: Compra de productos de limpieza
 *               amount:
 *                 type: number
 *                 example: 2300.50
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-18
 *     responses:
 *       201:
 *         description: Gasto registrado correctamente
 */
router.post('/register', createExpense);

/**
 * @swagger
 * /api/expenses/getAll:
 *   get:
 *     summary: Obtener todos los gastos registrados
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Lista de gastos
 */
router.get('/getAll', getAllExpenses);

/**
 * @swagger
 * /api/expenses/getById/{id}:
 *   get:
 *     summary: Obtener un gasto por su ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gasto
 *     responses:
 *       200:
 *         description: Gasto encontrado
 *       404:
 *         description: Gasto no encontrado
 */
router.get('/getById/:id', getExpenseById);

/**
 * @swagger
 * /api/expenses/update/{id}:
 *   put:
 *     summary: Actualizar un gasto por su ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gasto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Reparación de equipo
 *               amount:
 *                 type: number
 *                 example: 3200.00
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-19
 *     responses:
 *       200:
 *         description: Gasto actualizado correctamente
 *       404:
 *         description: Gasto no encontrado
 */
router.put('/update/:id', updateExpense);

/**
 * @swagger
 * /api/expenses/delete/{id}:
 *   delete:
 *     summary: Eliminar un gasto por su ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gasto
 *     responses:
 *       200:
 *         description: Gasto eliminado correctamente
 *       404:
 *         description: Gasto no encontrado
 */
router.delete('/delete/:id', deleteExpense);

module.exports = router;
