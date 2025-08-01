import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, CircularProgress, FormHelperText } from '@mui/material'
import useFeeOptions from './useFeeOptions'

const FeeSelect = ({ value, onChange, error, helperText, label = 'Tipo de cuota', name = 'feeId' }) => {
  const { fees, loading } = useFeeOptions()

  return (
    <FormControl fullWidth error={!!error} className="mb-3">
      <InputLabel>{label}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value}
          onChange={onChange}
          label={label}
          name={name}
        >
          {fees.map((fee) => (
            <MenuItem key={fee.id} value={fee.id}>
              {fee.name} - ${fee.price} / {fee.durationInDays} días
            </MenuItem>
          ))}
        </Select>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FeeSelect
