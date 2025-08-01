import React from 'react'
import { Typography, Button, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import FeeListTable from '../components/FeeListTable'
import useFetchFees from '../hooks/useFetchFees'

const FeeListPage = () => {
  const { fees, loading, error, refetch } = useFetchFees() // ⬅️ refetch agregado

  return (
    <div>
      <Typography variant="h5" className="mb-4">Tipos de Cuotas / Servicios</Typography>

      <div className="mb-3">
        <Link to="/cuotas/nueva">
          <Button variant="contained" color="primary">
            Registrar Nueva Cuota
          </Button>
        </Link>
      </div>

      {loading && <CircularProgress />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <FeeListTable fees={fees} onUpdate={refetch} />
      )}
    </div>
  )
}

export default FeeListPage
