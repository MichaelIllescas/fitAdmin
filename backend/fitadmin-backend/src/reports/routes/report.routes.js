const express = require('express')
const router = express.Router()
const controller = require('../controller/report.controller')

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reportes financieros del gimnasio
 */

/**
 * @swagger
 * /api/reports/getMonthly:
 *   get:
 *     summary: Obtener reporte financiero mensual (ingresos, egresos, balance)
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año (ej. 2025)
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mes (1-12)
 *     responses:
 *       200:
 *         description: Reporte mensual generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                 month:
 *                   type: integer
 *                 income:
 *                   type: number
 *                 expense:
 *                   type: number
 *                 balance:
 *                   type: number
 *       400:
 *         description: Parámetros faltantes
 */
router.get('/getMonthly', controller.getMonthlyReport)

/**
 * @swagger
 * /api/reports/dailyIncome:
 *   get:
 *     summary: Obtener ingresos detallados por una fecha específica
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha a consultar (formato YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Ingresos totales y detalle de pagos del día
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2025-07-27
 *                 total:
 *                   type: number
 *                   example: 8500
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 27/07/2025
 *                       amount:
 *                         type: number
 *                         example: 3500
 *                       method:
 *                         type: string
 *                         example: EFECTIVO
 *                       member:
 *                         type: string
 *                         example: Carlos Gómez
 *                       feeType:
 *                         type: string
 *                         example: Mensual
 *       400:
 *         description: Falta el parámetro de fecha
 *       500:
 *         description: Error del servidor
 */
router.get('/dailyIncome', controller.getDailyIncomeByDate)





/**
 * @swagger
 * /api/reports/monthlyIncomes:
 *   get:
 *     summary: Obtener ingresos mensuales de un año
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año (ej. 2025)
 *     responses:
 *       200:
 *         description: Lista de ingresos por mes del año especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   amount:
 *                     type: number
 *       400:
 *         description: Parámetro año faltante
 */
router.get('/monthlyIncomes', controller.getMonthlyIncomes)

/**
 * @swagger
 * /api/reports/annualIncomes:
 *   get:
 *     summary: Obtener ingresos anuales agrupados por año
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista de ingresos anuales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   year:
 *                     type: string
 *                   amount:
 *                     type: number
 */
router.get('/annualIncomes', controller.getAnnualIncomes)

/**
 * @swagger
 * /api/reports/annualProfit:
 *   get:
 *     summary: Obtener reporte de rentabilidad anual (ingresos - egresos)
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista de ingresos, egresos y rentabilidad por año
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   year:
 *                     type: string
 *                   income:
 *                     type: number
 *                   expense:
 *                     type: number
 *                   profit:
 *                     type: number
 */
router.get('/annualProfit', controller.getAnnualProfit)

/**
 * @swagger
 * /api/reports/monthlyExpenses:
 *   get:
 *     summary: Obtener egresos mensuales por año
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año en formato numérico (ej: 2025)
 *     responses:
 *       200:
 *         description: Lista de egresos agrupados por mes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: "01"
 *                   amount:
 *                     type: number
 *                     example: 5200
 *       400:
 *         description: Falta el parámetro de año
 *       500:
 *         description: Error del servidor
 */
router.get('/monthlyExpenses', controller.getMonthlyExpenses)


/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Obtener resumen financiero mensual
 *     description: Devuelve los ingresos y egresos mensuales para un año determinado.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *         required: true
 *         description: Año para el cual se desea obtener el resumen mensual.
 *     responses:
 *       '200':
 *         description: Resumen mensual obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: Ene
 *                     description: Nombre abreviado del mes
 *                   income:
 *                     type: number
 *                     example: 12000
 *                     description: Total de ingresos en el mes
 *                   expense:
 *                     type: number
 *                     example: 4700
 *                     description: Total de egresos en el mes
 *       '400':
 *         description: Año inválido o faltante en la query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Año inválido.
 *       '500':
 *         description: Error del servidor al obtener los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error del servidor.
 */
router.get('/monthly', controller.getMonthlySummary)


module.exports = router
