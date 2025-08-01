import { useState, useMemo, useEffect } from 'react'

const useTableLogic = (data, itemsPerPage) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const objectToString = (obj) => {
    if (!obj) return ''
    if (typeof obj === 'object') {
      return Object.values(obj).map(objectToString).join(' ')
    }
    return String(obj)
  }

  const filteredData = useMemo(() => {
    if (!search) return data
    const lowerSearch = search.toLowerCase()
    return data.filter((row) =>
      objectToString(row).toLowerCase().includes(lowerSearch)
    )
  }, [data, search])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, page, itemsPerPage])

  // 🔑 Ajustar página si queda vacía
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages) // volver a la última página válida
    }
  }, [page, totalPages])

  const handleChangePage = (_, newPage) => setPage(newPage)

  return { 
    search, 
    setSearch, 
    page, 
    paginatedData, 
    totalPages, 
    handleChangePage, 
    filteredCount: filteredData.length 
  }
}

export default useTableLogic
