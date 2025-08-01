import React from 'react'
import { Paper, Typography } from '@mui/material'

const MemberHeader = ({ member }) => {
  return (
    <Paper className="p-3 mb-4">
      <Typography variant="h6">
        {member.name} {member.lastName}
      </Typography>
      <Typography variant="body2">DNI: {member.dni}</Typography>
    </Paper>
  )
}

export default MemberHeader
