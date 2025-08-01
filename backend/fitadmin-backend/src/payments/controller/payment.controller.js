// controller/payment.controller.js
const { Member, Payment, FeeType } = require("../../members/model/index");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize"); // Asegurate de tener Sequelize importado

// Obtener todos los pagos
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Member,
          as: 'member', // ✅ alias obligatorio
          attributes: ['firstName', 'lastName']
        },
        {
          model: FeeType,
          as: 'feeType', // ✅ alias obligatorio
          attributes: ['name']
        }
      ],
      order: [['paymentDate', 'DESC']]
    });
    res.json(payments);
  } catch (error) {
    console.error('Error al obtener los pagos:', error); // 👈 opcional para debugging
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
};


// Obtener un pago por ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ error: "Pago no encontrado" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pago" });
  }
};

// Registrar un nuevo pago
exports.registerPayment = async (req, res) => {
  try {
    const { memberId, feeTypeId, amountPaid, paymentDate, paymentMethod } =
      req.body;
    const newPayment = await Payment.create({
      memberId,
      feeTypeId,
      amountPaid,
      paymentDate,
      paymentMethod,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el pago" });
  }
};

// Actualizar un pago existente
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId, feeTypeId, amountPaid, paymentDate, paymentMethod } =
      req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ error: "Pago no encontrado" });

    payment.memberId = memberId;
    payment.feeTypeId = feeTypeId;
    payment.amountPaid = amountPaid;
    payment.paymentDate = paymentDate;
    payment.paymentMethod = paymentMethod;

    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

// Eliminar un pago
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ error: "Pago no encontrado" });

    await payment.destroy();
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pago" });
  }
};
// buscar ultimo pago del cliente
exports.searchMemberWithLastPayment = async (req, res) => {
  const { query } = req.query;

  try {
    const member = await Member.findOne({
      where: {
        [Op.or]: [
          { documentNumber: query },
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [{ model: FeeType, as: "feeType" }],
    });

    if (!member)
      return res.status(404).json({ message: "Socio no encontrado" });

    const lastPayment = await Payment.findOne({
      where: { memberId: member.id },
      order: [["paymentDate", "DESC"]],
      include: [{ model: FeeType, as: "feeType" }],
    });

    res.json({ member, lastPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar el socio" });
  }
};
// buscar todos los pagos del cliente
exports.searchPaymentsByMember = async (req, res) => {
  const { query } = req.query;

  try {
    const member = await Member.findOne({
      where: {
        [Op.or]: [
          { documentNumber: query },
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
          Sequelize.where(
            Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')),
            {
              [Op.like]: `%${query}%`
            }
          )
        ]
      }
    });

    if (!member) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }

    const payments = await Payment.findAll({
      where: { memberId: member.id },
      include: [
        { model: FeeType, as: 'feeType', attributes: ['name' , 'durationInDays'] }, 
        { model: Member, as: 'member', attributes: ['firstName', 'lastName'] } 
      ],
      order: [['paymentDate', 'DESC']]
    });

    res.json(payments);
  } catch (error) {
    console.error('Error al buscar pagos:', error);
    res.status(500).json({ message: 'Error al buscar pagos del socio' });
  }
};

