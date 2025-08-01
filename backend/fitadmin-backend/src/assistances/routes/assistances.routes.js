const express = require('express');
const router = express.Router();
const controller = require('../controller/assistance.controller');

/**
 * @swagger
 * tags:
 *   name: Assistances
 *   description: Endpoints para gestionar asistencias de socios
 */

/**
 * @swagger
 * /api/assistances/getAll:
 *   get:
 *     summary: Obtener todas las asistencias registradas
 *     tags: [Assistances]
 *     responses:
 *       200:
 *         description: Lista de asistencias
 */
router.get('/getAll', controller.getAllAssistances);

/**
 * @swagger
 * /api/assistances/getByMember/{memberId}:
 *   get:
 *     summary: Obtener asistencias por ID de socio
 *     tags: [Assistances]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio
 *     responses:
 *       200:
 *         description: Lista de asistencias del socio
 */
router.get('/getByMember/:memberId', controller.getAssistancesByMember);

/**
 * @swagger
 * /api/assistances/register:
 *   post:
 *     summary: Registrar una asistencia
 *     tags: [Assistances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - date
 *               - status
 *             properties:
 *               memberId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PERMITIDA, DENEGADA]
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Asistencia registrada correctamente
 *       500:
 *         description: Error al registrar la asistencia
 */
router.post('/register', controller.registerAssistance);


/**
 * @swagger
 * /api/assistances/delete/{id}:
 *   delete:
 *     summary: Eliminar una asistencia por ID
 *     tags:
 *       - Assistances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asistencia a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Asistencia eliminada correctamente.
 *       404:
 *         description: Asistencia no encontrada
 *       500:
 *         description: Error al eliminar la asistencia
 */
router.delete('/delete/:id', controller.deleteAssistance)

/**
 * @swagger
 * /api/assistances/by-date/{date}:
 *   get:
 *     summary: Obtener asistencias por fecha
 *     tags:
 *       - Assistances
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD
 *         schema:
 *           type: string
 *           example: 2025-07-27
 *     responses:
 *       200:
 *         description: Lista de asistencias en esa fecha
 *       400:
 *         description: Fecha no proporcionada
 *       500:
 *         description: Error del servidor
 */

router.get('/by-date/:date', controller.getAssistancesByDate)

module.exports = router;
