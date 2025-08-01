import { useEffect, useState } from 'react'
import { getAnnualProfitability } from '../services/financeService'

const useProfitability = (year) => {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const result = await getAnnualProfitability(year)
      setIncome(result.income)
      setExpense(result.expense)
      setLoading(false)
    }
    fetch()
  }, [year])

  return { income, expense, loading }
}

export default useProfitability
