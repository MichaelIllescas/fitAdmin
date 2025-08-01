const { Assistance, Member }  = require('../../members/model/index');
const Payment = require('../../payments/model/Payment');
const FeeType = require('../../feeTypes/model/FeeType');
const { Op } = require('sequelize');

// Registrar asistencia
exports.registerAssistance = async (req, res) => {
  try {
    const { memberId, date } = req.body;

    const lastPayment = await Payment.findOne({
      where: { memberId },
      order: [['paymentDate', 'DESC']],
    });

    let status = 'DENEGADA';
    let reason = 'Sin pagos registrados';

    // Convertimos date recibido o usamos fecha actual
    const now = date ? new Date(date) : new Date();

    if (lastPayment) {
      const feeType = await FeeType.findByPk(lastPayment.feeTypeId);

      if (feeType) {
        const paymentDate = new Date(lastPayment.paymentDate);
        const expirationDate = new Date(paymentDate);
        expirationDate.setDate(expirationDate.getDate() + feeType.durationInDays);

        if (now <= expirationDate) {
          status = 'PERMITIDA';
          reason = null;
        } else {
          reason = 'Cuota vencida';
        }
      } else {
        reason = 'Tipo de cuota no encontrado';
      }
    }

    // Extraer hora legible desde `now`
    const formattedTime = now.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const asistencia = await Assistance.create({
      memberId,
      date: now, // guarda Date completo (fecha + hora UTC)
      time: formattedTime, // hora legible como '14:35'
      status,
      reason,
    });

    res.status(201).json(asistencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la asistencia' });
  }
};


// Obtener todas las asistencias
exports.getAllAssistances = async (req, res) => {
  try {
    const assistances = await Assistance.findAll({ order: [['date', 'DESC']] });
    res.status(200).json(assistances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las asistencias' });
  }
};

// Obtener asistencias por socio

// Obtener asistencias por socio (con datos del socio)
exports.getAssistancesByMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const assistances = await Assistance.findAll({
      where: { memberId },
      include: [
        {
          model: Member,
          as: 'member', // 👈 obligatorio por el alias definido
          attributes: ['firstName', 'lastName', 'documentNumber']
        }
      ],
      order: [['date', 'DESC']]
    });

    if (!assistances || assistances.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asistencias para este socio' });
    }

    res.status(200).json(assistances);
  } catch (error) {
    console.error('Error al obtener asistencias del socio:', error);
    res.status(500).json({ error: 'Error al obtener las asistencias del socio' });
  }
};


// eliminar asistencia
exports.deleteAssistance = async (req, res) => {
  try {
    const id = req.params.id
    await Assistance.destroy({ where: { id } })
    return res.status(200).json({ message: 'Asistencia eliminada correctamente.' })
  } catch (error) {
    console.error('Error al eliminar asistencia:', error)
    return res.status(500).json({ message: 'Error al eliminar asistencia.' })
  }
}

// obtener asistencias por fecha
exports.getAssistancesByDate = async (req, res) => {
  try {
    const date = req.params.date // formato esperado: yyyy-mm-dd

    if (!date) {
      return res.status(400).json({ message: 'La fecha es obligatoria.' })
    }

    const start = new Date(date)
    const end = new Date(date)
    end.setDate(end.getDate() + 1)

    const assistances = await Assistance.findAll({
  where: {
    date: {
      [Op.gte]: start,
      [Op.lt]: end
    }
  },
  include: [
  {
    model: Member,
    as: 'member', // 👈 necesario por el alias que definiste
    attributes: ['firstName', 'lastName', 'documentNumber']
  }
],

  order: [['date', 'ASC']]
})


    return res.status(200).json(assistances)
  } catch (error) {
    console.error('Error al obtener asistencias por fecha:', error)
    return res.status(500).json({ message: 'Error del servidor.' })
  }
}