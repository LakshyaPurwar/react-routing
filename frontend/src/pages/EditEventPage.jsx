import React from 'react';
import EventForm from '../components/EventForm'
import { useRouteLoaderData } from 'react-router-dom';

const EditEventPage = () => {
  const data = useRouteLoaderData('event-loader-route');
  return (
    <div><h1>Edit Event Page</h1>
    <EventForm event={data.event} ></EventForm>
    </div>
  )
}

export default EditEventPage