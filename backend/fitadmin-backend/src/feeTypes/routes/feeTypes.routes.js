const express = require('express');
const router = express.Router();
const controller = require('../controller/feeType.controller');

/**
 * @swagger
 * tags:
 *   name: FeeTypes
 *   description: Endpoints para gestionar tipos de cuota
 */

/**
 * @swagger
 * /api/fee-types/getAll:
 *   get:
 *     summary: Obtener todos los tipos de cuota
 *     tags: [FeeTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de cuota
 */
router.get('/getAll', controller.getAllFeeTypes);

/**
 * @swagger
 * /api/fee-types/getById/{id}:
 *   get:
 *     summary: Obtener un tipo de cuota por ID
 *     tags: [FeeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de cuota
 *     responses:
 *       200:
 *         description: Tipo de cuota encontrado
 *       404:
 *         description: Tipo de cuota no encontrado
 */
router.get('/getById/:id', controller.getFeeTypeById);

/**
 * @swagger
 * /api/fee-types/register:
 *   post:
 *     summary: Registrar un nuevo tipo de cuota
 *     tags: [FeeTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - durationInDays
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               durationInDays:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tipo de cuota registrado
 *       500:
 *         description: Error al registrar
 */
router.post('/register', controller.registerFeeType);

/**
 * @swagger
 * /api/fee-types/update/{id}:
 *   put:
 *     summary: Actualizar un tipo de cuota por ID
 *     tags: [FeeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de cuota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - durationInDays
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               durationInDays:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tipo de cuota actualizado
 *       404:
 *         description: Tipo de cuota no encontrado
 */
router.put('/update/:id', controller.updateFeeType);

/**
 * @swagger
 * /api/fee-types/delete/{id}:
 *   delete:
 *     summary: Eliminar un tipo de cuota por ID
 *     tags: [FeeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de cuota
 *     responses:
 *       200:
 *         description: Tipo de cuota eliminado correctamente
 *       404:
 *         description: Tipo de cuota no encontrado
 */
router.delete('/delete/:id', controller.deleteFeeType);

module.exports = router;
