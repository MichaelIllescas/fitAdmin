const Expense = require('../model/Expense')

// Crear gasto
const createExpense = async (req, res) => {
  try {
    const { description, amount, date } = req.body

    if (!description || !amount || !date) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' })
    }

    const expense = await Expense.create({ description, amount, date })
    res.status(201).json(expense)
  } catch (error) {
    console.error('Error al crear gasto:', error)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}

// Obtener todos los gastos
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ order: [['date', 'DESC']] })
    res.json(expenses)
  } catch (error) {
    console.error('Error al obtener gastos:', error)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}

// Obtener gasto por ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params
    const expense = await Expense.findByPk(id)

    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado.' })
    }

    res.json(expense)
  } catch (error) {
    console.error('Error al buscar gasto:', error)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}

// Actualizar gasto
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params
    const { description, amount, date } = req.body

    const expense = await Expense.findByPk(id)
    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado.' })
    }

    await expense.update({ description, amount, date })
    res.json(expense)
  } catch (error) {
    console.error('Error al actualizar gasto:', error)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}

// Eliminar gasto
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params
    const expense = await Expense.findByPk(id)

    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado.' })
    }

    await expense.destroy()
    res.json({ message: 'Gasto eliminado correctamente.' })
  } catch (error) {
    console.error('Error al eliminar gasto:', error)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
}
