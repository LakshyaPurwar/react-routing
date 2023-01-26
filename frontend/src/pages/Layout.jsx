import React from 'react'
import MainNavigation from '../components/MainNavigation'
import { Outlet } from 'react-router'
import { useNavigation } from 'react-router-dom'

const Layout = () => {
  const navigation = useNavigation();
    const navigationState = navigation.state;

  return (
    <>
    <MainNavigation></MainNavigation>
    {navigationState=='loading'  && <div>Loading ... </div>}
    <Outlet></Outlet>
    </>
  )
}

export default Layout