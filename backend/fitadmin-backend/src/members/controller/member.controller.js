const { Member, FeeType, Payment } = require('../../members/model/index');
const { Op, fn, col, where, literal } = require('sequelize');



// Crear un nuevo socio
const createMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      documentNumber,
      phone,
      birthDate,
      gender,
      feeId 
    } = req.body;

    // Validación básica
    if (!firstName || !lastName || !documentNumber || !birthDate || !gender || !feeId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

      // Verificar si el DNI ya existe
    const existingMember = await Member.findOne({ where: { documentNumber } });
    if (existingMember) {
      return res.status(409).json({
        message: `Ya existe un socio registrado con el DNI ${documentNumber}.`
      });
    }
    const newMember = await Member.create({
      firstName,
      lastName,
      documentNumber,
      phone,
      birthDate,
      gender,
      feeId 
    });

    return res.status(201).json(newMember);
  } catch (error) {
    console.error('Error al crear socio:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};


// Obtener todos los socios con validación de pagos
const getAllMembers = async (req, res) => {
  try {
    // 1. Obtener socios con su cuota y último pago
    const members = await Member.findAll({
      include: [
        {
          model: FeeType,
          as: 'feeType',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Payment,
          as: 'payments',
          separate: true, // para ordenar pagos sin duplicar miembros
          limit: 1,
          order: [['paymentDate', 'DESC']]
        }
      ],
      order: [['lastName', 'ASC']]
    });

    // 2. Validar vigencia de pagos y actualizar status
    for (let member of members) {
      const lastPayment = member.payments[0]; // último pago

      let newStatus = 'Inactivo'; // default
      if (lastPayment) {
        const paymentDate = new Date(lastPayment.paymentDate);
        const duration = member.feeType?.durationInDays || 0;

        const dueDate = new Date(paymentDate);
        dueDate.setDate(dueDate.getDate() + duration);

        if (new Date() <= dueDate) {
          newStatus = 'Activo';
        }
      }

      // 3. Actualizar status si cambió
      if (member.status !== newStatus) {
        await member.update({ status: newStatus });
      }
    }

    return res.status(200).json(members);
  } catch (error) {
    console.error('Error al obtener socios:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};

// Buscar socio por nombre completo o DNI (sin importar mayúsculas/minúsculas)
const searchMember = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Falta el parámetro de búsqueda.' });
  }

  try {
    const normalized = query.toLowerCase();

    const member = await Member.findOne({
      where: {
        [Op.or]: [
          where(fn('LOWER', col('firstName')), { [Op.like]: `%${normalized}%` }),
          where(fn('LOWER', col('lastName')), { [Op.like]: `%${normalized}%` }),
          literal(`LOWER(firstName || ' ' || lastName) LIKE '%${normalized}%'`),
          where(col('documentNumber'), { [Op.like]: `%${query}%` })
        ]
      },
      include: [
        {
          model: FeeType,
          as: 'feeType',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Payment,
          as: 'payments',
          limit: 1,
          order: [['paymentDate', 'DESC']],
          include: [
            {
              model: FeeType,
              as: 'feeType',
              attributes: ['id', 'name', 'durationInDays', 'price']
            }
          ]
        }
      ]
    });

    if (!member) {
      return res.status(404).json({ message: 'Socio no encontrado.' });
    }

    const result = {
      ...member.toJSON(),
      lastPayment: member.payments[0] || null
    };
    delete result.payments;

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al buscar socio:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};




// Verificar si el socio está al día o atrasado
const checkPaymentStatus = async (req, res) => {
  try {
    const { memberId } = req.params;

    const lastPayment = await Payment.findOne({
      where: { memberId },
      order: [['paymentDate', 'DESC']],
    });

    if (!lastPayment) {
      return res.json({ status: 'ATRASADO', reason: 'Sin pagos registrados' });
    }

    const feeType = await FeeType.findByPk(lastPayment.feeTypeId);
    if (!feeType) {
      return res.json({ status: 'ATRASADO', reason: 'Tipo de cuota no encontrado' });
    }

    const paymentDate = new Date(lastPayment.paymentDate);
    const expirationDate = new Date(paymentDate);
    expirationDate.setDate(expirationDate.getDate() + feeType.durationInDays);

    const today = new Date();

    if (today <= expirationDate) {
      return res.json({ status: 'AL_DIA', expiresAt: expirationDate });
    } else {
      return res.json({ status: 'ATRASADO', reason: 'Cuota vencida', expiresAt: expirationDate });
    }

  } catch (error) {
    console.error('Error al verificar estado del socio:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};

// Actualizar un socio por ID
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, documentNumber, phone, birthDate, gender } = req.body;

    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Socio no encontrado.' });
    }

    member.firstName = firstName;
    member.lastName = lastName;
    member.documentNumber = documentNumber;
    member.phone = phone;
    member.birthDate = birthDate;
    member.gender = gender;

    await member.save();
    return res.status(200).json(member);
  } catch (error) {
    console.error('Error al actualizar socio:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};

// Eliminar un socio por ID (eliminación lógica si querés)
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Socio no encontrado.' });
    }

    await member.destroy(); // o .update({ active: false }) si es lógica
    return res.json({ message: 'Socio eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar socio:', error);
    return res.status(500).json({ message: 'Error del servidor.' });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  searchMember,
  checkPaymentStatus,
  updateMember,
  deleteMember
};
