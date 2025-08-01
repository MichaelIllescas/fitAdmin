const express = require('express');
const router = express.Router();
const controller = require('../controller/payment.controller');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Endpoints para gestionar pagos de cuotas
 */

/**
 * @swagger
 * /api/payments/getAll:
 *   get:
 *     summary: Obtener todos los pagos registrados
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Lista de pagos registrados
 */
router.get('/getAll', controller.getAllPayments);

/**
 * @swagger
 * /api/payments/getById/{id}:
 *   get:
 *     summary: Obtener un pago por ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago encontrado
 *       404:
 *         description: Pago no encontrado
 */
router.get('/getById/:id', controller.getPaymentById);

/**
 * @swagger
 * /api/payments/register:
 *   post:
 *     summary: Registrar un nuevo pago de cuota
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - feeTypeId
 *               - amountPaid
 *               - paymentDate
 *               - paymentMethod
 *             properties:
 *               memberId:
 *                 type: integer
 *               feeTypeId:
 *                 type: integer
 *               amountPaid:
 *                 type: number
 *               paymentDate:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *                 enum: [EFECTIVO, TRANSFERENCIA, DEBITO, OTRO]
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *       500:
 *         description: Error al registrar el pago
 */
router.post('/register', controller.registerPayment);

/**
 * @swagger
 * /api/payments/update/{id}:
 *   put:
 *     summary: Actualizar un pago por ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - feeTypeId
 *               - amountPaid
 *               - paymentDate
 *               - paymentMethod
 *             properties:
 *               memberId:
 *                 type: integer
 *               feeTypeId:
 *                 type: integer
 *               amountPaid:
 *                 type: number
 *               paymentDate:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *       404:
 *         description: Pago no encontrado
 */
router.put('/update/:id', controller.updatePayment);

/**
 * @swagger
 * /api/payments/delete/{id}:
 *   delete:
 *     summary: Eliminar un pago por ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
 *       404:
 *         description: Pago no encontrado
 */
router.delete('/delete/:id', controller.deletePayment);


/**
 * @swagger
 * /api/payments/searchMember:
 *   get:
 *     summary: Buscar un socio por DNI o nombre y obtener su último pago
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI o parte del nombre/apellido del socio
 *     responses:
 *       200:
 *         description: Datos del socio y su último pago (si existe)
 *       404:
 *         description: Socio no encontrado
 *       500:
 *         description: Error al buscar el socio
 */

router.get('/searchMember', controller.searchMemberWithLastPayment);



/**
 * @swagger
 * /api/payments/search:
 *   get:
 *     summary: Buscar todos los pagos de un socio por DNI o nombre/apellido
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI o parte del nombre o apellido del socio
 *     responses:
 *       200:
 *         description: Lista de pagos del socio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   amountPaid:
 *                     type: number
 *                   paymentDate:
 *                     type: string
 *                     format: date
 *                   paymentMethod:
 *                     type: string
 *                   feeTypeId:
 *                     type: integer
 *                   memberId:
 *                     type: integer
 *                   FeeType:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   Member:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *       404:
 *         description: Socio no encontrado
 *       500:
 *         description: Error al buscar pagos del socio
 */
router.get('/search', controller.searchPaymentsByMember)


module.exports = router;
