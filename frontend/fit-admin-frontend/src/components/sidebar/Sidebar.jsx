import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import sidebarConfig from './sidebarConfig'
import './Sidebar.css'
import img from '../../assets/img/logo-sin-fondo.png';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId))
  }

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" style={{ width: '270px' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Imparable Gym</span>
      </Link>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {sidebarConfig.map((section) => (
          <li className="nav-item" key={section.label}>
            <button
              className="nav-link text-white dropdown-toggle w-100 text-start"
              onClick={() => toggleMenu(section.submenuId)}
            >
              {section.icon} {section.label}
            </button>

            <div className={`collapse ps-3 ${openMenu === section.submenuId ? 'show' : ''}`} id={section.submenuId}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="nav-link text-white">
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <img src={img} alt="" style={{ height: '100px', width: '100px', margin: "0 auto 10px" }} />

      <hr />
      <div className="text-white">v1.0</div>
    </div>
  )
}

export default Sidebar
