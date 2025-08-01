import React from 'react'
import SearchMemberForm from '../components/SearchMemberForm'
import MemberCard from '../components/MemberCard'
import useDashboard from '../hooks/useDashboard'
import img from '../../assets/img/logo-sin-fondo.png';
import './dashboard.css'

const DashboardPage = () => {
  const {
    query,
    setQuery,
    member,
    handleSearch,
    handleClear,
    loading,
    error
  } = useDashboard()

  return (
    <>
    <div className='dashboard'>
      <h2 className="mb-4">Bienvenido al Sistema de Gestión</h2>

      <SearchMemberForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {member && (
        <div className="mt-4">
          <MemberCard member={member} />
        </div>

)}
    </div>
    <div className='div-img'>

<img src={img} alt="" style={{height:'300px', width:'300px', position:"absolute", bottom:150, left:'50%' , backgroundColor:"#000", borderRadius:"50%", zIndex:'-1' }} className='' />
    </div>


</>
  )
}

export default DashboardPage
