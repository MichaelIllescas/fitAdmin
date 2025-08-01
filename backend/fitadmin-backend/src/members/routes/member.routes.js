const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller');

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Endpoints para gestionar socios del gimnasio
 */

/**
 * @swagger
 * /api/members/register:
 *   post:
 *     summary: Registrar un nuevo socio
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - documentNumber
 *               - birthDate
 *               - gender
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Socio creado correctamente
 *       400:
 *         description: Datos faltantes o inválidos
 */
router.post('/register', controller.createMember);

/**
 * @swagger
 * /api/members/getAll:
 *   get:
 *     summary: Obtener todos los socios
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Lista de socios
 */
router.get('/getAll', controller.getAllMembers);

/**
 * @swagger
 * /api/members/search:
 *   get:
 *     summary: Buscar socio por nombre completo o DNI
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre, apellido o DNI del socio
 *     responses:
 *       200:
 *         description: Socio encontrado
 *       404:
 *         description: Socio no encontrado
 */
router.get('/search', controller.searchMember);

/**
 * @swagger
 * /api/members/checkStatus/{memberId}:
 *   get:
 *     summary: Verificar si el socio está al día o atrasado con la cuota
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio
 *     responses:
 *       200:
 *         description: Estado del pago actual del socio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [AL_DIA, ATRASADO]
 *                 expiresAt:
 *                   type: string
 *                   format: date
 *                 reason:
 *                   type: string
 */
router.get('/checkStatus/:memberId', controller.checkPaymentStatus);

/**
 * @swagger
 * /api/members/update/{id}:
 *   put:
 *     summary: Actualizar los datos de un socio por ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Socio actualizado correctamente
 *       404:
 *         description: Socio no encontrado
 */
router.put('/update/:id', controller.updateMember);

/**
 * @swagger
 * /api/members/delete/{id}:
 *   delete:
 *     summary: Eliminar un socio por ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio
 *     responses:
 *       200:
 *         description: Socio eliminado correctamente
 *       404:
 *         description: Socio no encontrado
 */
router.delete('/delete/:id', controller.deleteMember);


module.exports = router;
