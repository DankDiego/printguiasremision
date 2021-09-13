import React from 'react'
import './Sidebar.css'
import logo from '../../../statics/logo.svg'

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? 'sidebar_responsive' : ''} id='sidebar'>
      <div className='sidebar__title'>
        <div className='sidebar__img'>
          <img src={logo} alt='logo' />
          <h1>React-App</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className='fa fa-times'
          id='sidebarIcon'
          aria-hidden='true'
        />
      </div>

      <div className='sidebar__menu'>
        <div className='sidebar__link active_menu_link'>
          <i className='fa fa-home' />
          <a href='#'>Dashboard</a>
        </div>
        <h2>MNG</h2>
        <div className='sidebar__link'>
          <i className='fa fa-user-secret' aria-hidden='true' />
          <a href='#'>Admin Management</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-building-o' />
          <a href='#'>Company Management</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-wrench' />
          <a href='#'>Employee Management</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-archive' />
          <a href='#'>Warehouse</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-handshake-o' />
          <a href='#'>Contracts</a>
        </div>
        <h2>LEAVE</h2>
        <div className='sidebar__link'>
          <i className='fa fa-question' />
          <a href='#'>Requests</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-sign-out' />
          <a href='#'>Leave Policy</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-calendar-check-o' />
          <a href='#'>Special Days</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-files-o' />
          <a href='#'>Apply for leave</a>
        </div>
        <h2>PAYROLL</h2>
        <div className='sidebar__link'>
          <i className='fa fa-money' />
          <a href='#'>Payroll</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-briefcase' />
          <a href='#'>Paygrade</a>
        </div>
        <div className='sidebar__logout'>
          <i className='fa fa-power-off' />
          <a href='#'>Log out</a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
