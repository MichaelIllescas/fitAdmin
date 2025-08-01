import React from 'react'
import {  HashRouter } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
     <HashRouter>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4 pb-0">
          <AppRoutes />
        </div>
      </div>
    </HashRouter>
  )
}

export default App
