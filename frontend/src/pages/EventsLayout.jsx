import React from 'react'
import { Outlet } from 'react-router-dom'
import EventsNavigation from '../components/EventsNavigation'


const EventsLayout = () => {
    
  return (
    <div>
        <EventsNavigation></EventsNavigation>
        <Outlet></Outlet>
    </div>
  )
}

export default EventsLayout