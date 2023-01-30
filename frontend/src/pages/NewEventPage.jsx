import React from 'react';
import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return (
    <div>
      <h1>NewEventPage</h1>
      <EventForm method='POST'></EventForm>
    </div>
  )
}

export default NewEventPage;

