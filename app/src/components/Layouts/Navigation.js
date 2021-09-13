import React from 'react'
import NavbarUser from '../dashboard/navbar-user/Navbar-user'
export default function Navigation ({ children }) {
  return (
    <>
      <div>
        <NavbarUser />
        {children}
      </div>
    </>
  )
}
