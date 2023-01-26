import React from 'react'
import { useParams } from 'react-router-dom'
const EventDetailsPage = () => {
  const params = useParams();
  return (
    <div><h1>{params.eventId} Details Page</h1></div>
  )
}

export default EventDetailsPage