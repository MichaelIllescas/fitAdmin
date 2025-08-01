import { useEffect, useState } from 'react'
import { getIncomeExpenseComparative } from '../services/financeService'

const useComparativeData = (year) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const result = await getIncomeExpenseComparative(year)
      setData(result)
      setLoading(false)
    }
    fetch()
  }, [year])

  return { data, loading }
}

export default useComparativeData
