import './Navbar.css'
import React from 'react'

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className='navbar'>
      <div className='nav_icon' onClick={() => openSidebar()}>
        <i className='fa fa-bars' aria-hidden='true' />
      </div>

    </nav>
  )
}

export default Navbar
