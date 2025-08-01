const FeeType = require('../model/FeeType');

// Obtener todos los tipos de cuota
exports.getAllFeeTypes = async (req, res) => {
  try {
    const feeTypes = await FeeType.findAll({ order: [['createdAt', 'DESC']] });
    res.json(feeTypes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de cuota' });
  }
};

// Obtener un tipo de cuota por ID
exports.getFeeTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const feeType = await FeeType.findByPk(id);
    if (!feeType) return res.status(404).json({ error: 'Tipo de cuota no encontrado' });
    res.json(feeType);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el tipo de cuota' });
  }
};

// Registrar un nuevo tipo de cuota
exports.registerFeeType = async (req, res) => {
  try {
    const { name, durationInDays, price } = req.body;
    const newFeeType = await FeeType.create({ name, durationInDays, price });
    res.status(201).json(newFeeType);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el tipo de cuota' });
  }
};

// Actualizar un tipo de cuota existente
exports.updateFeeType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, durationInDays, price } = req.body;
    const feeType = await FeeType.findByPk(id);
    if (!feeType) return res.status(404).json({ error: 'Tipo de cuota no encontrado' });

    feeType.name = name;
    feeType.durationInDays = durationInDays;
    feeType.price = price;
    await feeType.save();

    res.json(feeType);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el tipo de cuota' });
  }
};

// Eliminar un tipo de cuota
exports.deleteFeeType = async (req, res) => {
  try {
    const { id } = req.params;
    const feeType = await FeeType.findByPk(id);
    if (!feeType) return res.status(404).json({ error: 'Tipo de cuota no encontrado' });

    await feeType.destroy();
    res.json({ message: 'Tipo de cuota eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el tipo de cuota' });
  }
};
