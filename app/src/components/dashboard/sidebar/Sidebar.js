import './Sidebar.css'
import React from 'react'
import logo from '../../../statics/logo.svg'
import { Link } from 'react-router-dom'
const Sidebar = ({ sidebarOpen, closeSidebar, history }) => {
  const logoutSesion = () => {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('SessionData')
  }
  return (
    <div className={sidebarOpen ? 'sidebar_responsive' : ''} id='sidebar'>
      <div className='sidebar__title'>
        <div className='sidebar__img'>
          <img src={logo} alt='logo' />
          <h1>Sistema Guias</h1>
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
          <Link to='/dashboard'>DashBoard</Link>
        </div>

        <h2><i className='fa fa-shopping-bag' /> Guias</h2>

        <div className='sidebar__link'>
          <i className='fa fa-plus' />
          <Link to='/dashboard/crearguia'>Registrar Guia</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-scroll' />
          <Link to='/dashboard/ListaGuia'>Lista de Guias</Link>
        </div>

        <h2><i className='fas fa-users-cog' /> Administrar Personal</h2>
        <div className='sidebar__link'>
          <i className='fas fa-truck-moving' />
          <Link to='/dashboard/CrearPlaca'>Registrar Placa</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-truck-moving' />
          <Link to='/dashboard/ListaPlaca'>Lista de Placas</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-mountain' />
          <Link to='/dashboard/CrearMaterial'>Registrar Material</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-list' />
          <Link to='/dashboard/ListaMaterial'>Lista de Materiales</Link>
        </div>
        <h2><i className='fas fa-chart-line' /> Reportes</h2>
        <div className='sidebar__link'>
          <i className='fas fa-money-bill-wave' />
          <Link to='/dashboard/EntreFechasReporte'>Guias entre fechas:</Link>
        </div>

        <div className='sidebar__logout'>
          <i className='fa fa-power-off' />
          {/* <button onClick={logoutSesion}>Cerrar Session</button> */}
          <Link onClick={logoutSesion} to='/'>Cerrar Session</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
