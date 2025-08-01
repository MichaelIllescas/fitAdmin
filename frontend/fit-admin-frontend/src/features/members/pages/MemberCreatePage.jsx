import React from 'react'
import { useNavigate } from 'react-router-dom'
import MemberForm from '../components/MemberForm'
import useMemberForm from '../hooks/useMemberForm'

const MemberCreatePage = () => {
  const navigate = useNavigate()

  const { values, handleChange, handleSubmit } = useMemberForm({
    onSuccess: () => navigate('/')
  })

  return (
    <div>
      <h2 className="mb-4">Registrar Socio</h2>

      <MemberForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default MemberCreatePage
