const { Payment, Member, FeeType } = require('../../members/model/index')
const Expense = require('../../expenses/model/Expense')
const { Op, fn, col, literal, where} = require('sequelize')


// Helper para formatear la fecha en DD/MM/YYYY sin problemas de timezone
const formatDateArg = (input) =>
  new Date(input).toISOString().slice(0, 10).split('-').reverse().join('/')


// Nombres de los meses en español
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const getMonthlySummary = async (req, res) => {
  const year = parseInt(req.query.year)

  if (!year || isNaN(year)) {
    return res.status(400).json({ message: 'Año inválido.' })
  }

  try {
    const start = new Date(`${year}-01-01`)
    const end = new Date(`${year}-12-31`)

    // Ingresos por mes
    const payments = await Payment.findAll({
      attributes: [
        [fn('strftime', '%m', col('paymentDate')), 'month'],
        [fn('sum', col('amountPaid')), 'total']
      ],
      where: {
        paymentDate: {
          [Op.between]: [start, end]
        }
      },
      group: ['month']
    })

    // Egresos por mes
    const expenses = await Expense.findAll({
      attributes: [
        [fn('strftime', '%m', col('date')), 'month'],
        [fn('sum', col('amount')), 'total']
      ],
      where: {
        date: {
          [Op.between]: [start, end]
        }
      },
      group: ['month']
    })

    // Convertir a objetos clave-valor por mes
    const incomeByMonth = {}
    payments.forEach(p => {
      const monthIndex = parseInt(p.get('month')) - 1
      incomeByMonth[monthIndex] = parseFloat(p.get('total'))
    })

    const expenseByMonth = {}
    expenses.forEach(e => {
      const monthIndex = parseInt(e.get('month')) - 1
      expenseByMonth[monthIndex] = parseFloat(e.get('total'))
    })

    // Unificar datos
    const result = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i],
      income: incomeByMonth[i] || 0,
      expense: expenseByMonth[i] || 0
    }))

    res.json(result)

  } catch (err) {
    console.error('Error al obtener resumen mensual:', err)
    res.status(500).json({ message: 'Error del servidor.' })
  }
}


// Reporte financiero mensual
const getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query

    if (!year || !month) {
      return res.status(400).json({ message: 'Debes especificar año y mes.' })
    }

    const start = new Date(`${year}-${month}-01`)
    const end = new Date(start)
    end.setMonth(end.getMonth() + 1)

    const totalIncome = await Payment.sum('amountPaid', {
      where: {
        paymentDate: { [Op.gte]: start, [Op.lt]: end }
      }
    })

    const totalExpense = await Expense.sum('amount', {
      where: {
        date: { [Op.gte]: start, [Op.lt]: end }
      }
    })

    const balance = (totalIncome || 0) - (totalExpense || 0)

    res.json({
      month,
      year,
      income: totalIncome || 0,
      expense: totalExpense || 0,
      balance
    })
  } catch (error) {
    console.error('Error al generar reporte mensual:', error)
    res.status(500).json({ message: 'Error al generar el reporte financiero.' })
  }
}

// Ingresos diarios fecha seleccionada por el cliente

const getDailyIncomeByDate = async (req, res) => {
  try {
    const { date } = req.query

    if (!date) {
      return res.status(400).json({ message: 'Debes especificar una fecha (YYYY-MM-DD).' })
    }

    // Buscar pagos con coincidencia exacta en la fecha (ignorando la hora)
    const payments = await Payment.findAll({
      where: where(fn('DATE', col('paymentDate')), date),
      include: [
        {
          model: Member,
          as: 'member',
          attributes: ['firstName', 'lastName']
        },
        {
          model: FeeType,
          as: 'feeType',
          attributes: ['name']
        }
      ],
      order: [['paymentDate', 'ASC']]
    })

    // Total general del día
    const total = payments.reduce((sum, p) => sum + p.amountPaid, 0)

    // Detalle mapeado
    const detail = payments.map(p => ({
      id: p.id,
      date: formatDateArg(p.paymentDate),
      amount: p.amountPaid,
      method: p.paymentMethod,
      member: `${p.member?.firstName || ''} ${p.member?.lastName || ''}`,
      feeType: p.feeType?.name || 'N/A'
    }))

    // Respuesta final
    res.json({
      date,
      total,
      payments: detail
    })
  } catch (error) {
    console.error('Error al obtener ingresos detallados del día:', error)
    res.status(500).json({ message: 'Error del servidor al obtener ingresos del día.' })
  }
}


// Ingresos mensuales por año
const getMonthlyIncomes = async (req, res) => {
  try {
    const { year } = req.query
    if (!year) return res.status(400).json({ message: 'Debes especificar un año.' })

    const start = new Date(`${year}-01-01`)
    const end = new Date(`${parseInt(year) + 1}-01-01`)

    const monthlyIncomes = await Payment.findAll({
      attributes: [
        [fn('strftime', '%m', col('paymentDate')), 'month'],
        [fn('SUM', col('amountPaid')), 'amount']
      ],
      where: {
        paymentDate: { [Op.gte]: start, [Op.lt]: end }
      },
      group: [fn('strftime', '%m', col('paymentDate'))],
      order: [[literal('month'), 'ASC']]
    })

    res.json(monthlyIncomes)
  } catch (error) {
    console.error('Error al obtener ingresos mensuales:', error)
    res.status(500).json({ message: 'Error al obtener ingresos mensuales.' })
  }
}


// Ingresos anuales
const getAnnualIncomes = async (req, res) => {
  try {
    const annualIncomes = await Payment.findAll({
      attributes: [
        [fn('strftime', '%Y', col('paymentDate')), 'year'],
        [fn('SUM', col('amountPaid')), 'amount']
      ],
      group: ['year'],
      order: [[literal('year'), 'ASC']]
    })

    res.json(annualIncomes)
  } catch (error) {
    console.error('Error al obtener ingresos anuales:', error)
    res.status(500).json({ message: 'Error al obtener ingresos anuales.' })
  }
}

// Rentabilidad anual (ingresos - egresos)
const getAnnualProfit = async (req, res) => {
  try {
    const incomes = await Payment.findAll({
      attributes: [
        [fn('strftime', '%Y', col('paymentDate')), 'year'],
        [fn('SUM', col('amountPaid')), 'income']
      ],
      group: ['year']
    })

    const expenses = await Expense.findAll({
      attributes: [
        [fn('strftime', '%Y', col('date')), 'year'],
        [fn('SUM', col('amount')), 'expense']
      ],
      group: ['year']
    })

    const incomeMap = Object.fromEntries(incomes.map(i => [i.dataValues.year, parseFloat(i.dataValues.income)]))
    const expenseMap = Object.fromEntries(expenses.map(e => [e.dataValues.year, parseFloat(e.dataValues.expense)]))

    const years = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)]))

    const report = years.map(year => ({
      year,
      income: incomeMap[year] || 0,
      expense: expenseMap[year] || 0,
      profit: (incomeMap[year] || 0) - (expenseMap[year] || 0)
    }))

    res.json(report)
  } catch (error) {
    console.error('Error al obtener rentabilidad anual:', error)
    res.status(500).json({ message: 'Error al obtener rentabilidad anual.' })
  }
}

// gastos mensuales
const getMonthlyExpenses = async (req, res) => {
  try {
    const { year } = req.query

    if (!year) {
      return res.status(400).json({ message: 'Debes especificar un año.' })
    }

    const start = new Date(`${year}-01-01`)
    const end = new Date(`${parseInt(year) + 1}-01-01`)

    const monthlyExpenses = await Expense.findAll({
      attributes: [
        [fn('strftime', '%m', col('date')), 'month'],
        [fn('SUM', col('amount')), 'amount']
      ],
      where: {
        date: {
          [Op.gte]: start,
          [Op.lt]: end
        }
      },
      group: [fn('strftime', '%m', col('date'))],
      order: [[fn('strftime', '%m', col('date')), 'ASC']]
    })

    res.json(monthlyExpenses)
  } catch (error) {
    console.error('Error al obtener egresos mensuales:', error)
    res.status(500).json({ message: 'Error al obtener egresos mensuales.' })
  }
}

module.exports = {
  getMonthlyReport,
  getDailyIncomeByDate,
  getMonthlyIncomes,
  getAnnualIncomes,
  getAnnualProfit,
  getMonthlyExpenses,
  getMonthlySummary
}
