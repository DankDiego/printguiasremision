import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import DashLayout from '../Layouts/DashLayout'
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem('authToken')
          ? (
            <DashLayout>
              <Component {...props} />
            </DashLayout>
            )
          : (

            <Redirect to='/login' />
            )}
    />
  )
}

export default PrivateRoute
