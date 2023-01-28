import React from 'react';
import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return (
    <div>
      <h1>NewEventPage</h1>
      <EventForm></EventForm>
    </div>
  )
}

export default NewEventPage;

export async function FormAction({request , params})
{
    const formData  = await request.formData();

    const eventData = {
      title : formData.get('title'),
      image : formData.get('image'),
      date : formData.get('date'),
      description : formData.get('description')

    }

    const response = await fetch('http://localhost:8080/events' , {
      method:'POST',
      headers:{
         'Content-Type' : 'application/json'
      },
      body : JSON.stringify(eventData)
    });

    if(!response.ok)
    {
      throw json({message : 'Could not send data'} , {status : 500});
    }
    else{
      return redirect('/events');
    }
  

}