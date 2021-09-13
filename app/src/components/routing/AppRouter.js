import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Routing
import PrivateRoute from '../routing/PrivateRoute'
import PublicRoute from '../routing/PublicRoute'
import NotFoundScreen from '../screens/404'
// Screens
import PrivateScreen from '../screens/PrivateScreen'
import LoginScreen from '../screens/LoginScreen'
import PlacasScreen from '../screens/PlacasScreen'
import CrearPlacaScreen from '../screens/CrearPlacaScreen'
import CrearGuiaScreen from '../screens/CrearGuiaScreen'
import GuiasScreen from '../screens/GuiasScreen'
import ProductoScreenEdit from '../screens/ProductoScreenEdit'
import MaterialesScreen from './../screens/MaterialesScreen'
import CrearMaterialForm from './../screens/CrearMaterialForm'
import EntreFechaReport from '../screens/EntreFechasReport'
export default function AppRouter () {
  return (
    <Router>

      <Switch>
        <PublicRoute exact path='/' component={LoginScreen} />
        <PublicRoute exact path='/login' component={LoginScreen} />
        <PrivateRoute exact path='/dashboard' component={PrivateScreen} />
        <PrivateRoute exact path='/dashboard/CrearGuia' component={CrearGuiaScreen} />
        <PrivateRoute exact path='/dashboard/ListaGuia' component={GuiasScreen} />
        <PrivateRoute exact path='/dashboard/CrearPlaca' component={CrearPlacaScreen} />
        <PrivateRoute exact path='/dashboard/ListaPlaca' component={PlacasScreen} />
        <PrivateRoute exact path='/dashboard/CrearMaterial' component={CrearMaterialForm} />
        <PrivateRoute exact path='/dashboard/ListaMaterial' component={MaterialesScreen} />
        <PrivateRoute exact path='/dashboard/EntreFechasReporte' component={EntreFechaReport} />
        <PrivateRoute exact path='/dashboard/ListaProducto/edit/:id' component={ProductoScreenEdit} />
        <Route path='*' component={NotFoundScreen} />
      </Switch>

    </Router>
  )
}
