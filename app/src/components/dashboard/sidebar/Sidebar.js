import './Sidebar.css'
import React from 'react'
import DyH from '../../../statics/DyHnoback.png'
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
          <img src={DyH} alt='logo' />
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

        <h2><i className='fa fa-paperclip' /> Guias</h2>

        <div className='sidebar__link'>
          <i className='fa fa-cube' />
          <Link to='/dashboard/crearguia'> Guia M.Cubico</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-truck-loading' />
          <Link to='/dashboard/crearguiaton'> Guia Toneladas</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-scroll' />
          <Link to='/dashboard/ListaGuia'>Lista de Guias</Link>
        </div>

        <h2><i className='fas fa-users-cog' /> Guardar en Base de Datos</h2>
        <div className='sidebar__link'>
          <i className='fas fa-truck-moving' />
          <Link to='/dashboard/CrearPlaca'>Registrar Placa</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fas fa-id-card' />
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
        <div className='sidebar__link'>
          <i className='fas fa-handshake' />
          <Link to='/dashboard/crearrsocial'>Registrar R.Social</Link>
        </div>
        <div className='sidebar__link'>
          <i className='fab fa-slideshare' />
          <Link to='/dashboard/listarsocial'>Lista de R.Sociales</Link>
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
