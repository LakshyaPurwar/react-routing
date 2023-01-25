import React, { Fragment } from 'react'
import Navigation from '../Components/Navigation'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <React.Fragment>
        <Navigation></Navigation>
        <Outlet></Outlet>

    </React.Fragment>
  )
}

export default Layout