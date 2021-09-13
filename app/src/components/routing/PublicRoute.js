import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from '../Layouts/Navigation'
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (
          <>
            <Navigation />
            <Component {...props} />
          </>
        )}
    />
  )
}

export default PublicRoute
