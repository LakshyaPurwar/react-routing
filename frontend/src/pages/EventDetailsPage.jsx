import React from 'react'
import { json, redirect, useParams } from 'react-router-dom'
import { useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
const EventDetailsPage = () => {
  // const params = useParams();
  const data = useRouteLoaderData('event-loader-route');
  console.log(data);
  return (
    <div><EventItem event={data.event}/></div>
  )
}

export default EventDetailsPage;

export async function LoaderFunction({request , params}){
  console.log(params.eventId);
  const response =await  fetch('http://localhost:8080/events/'+params.eventId);
  console.log(response.status);
  if(!response.ok)
  {
    throw json({message : 'Could not load the event details'},{
      status: 500
    });
  }
  else
  {
    return response;
  }
}

export async function ActionFunction({params , request}){
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/'+eventId,{
    method:request.method,
  });

  if(!response.ok)
  {
    throw json({message : 'Could not delete this event!'},
    {status : 500});
  }
  else
  {
    //Again we wanna redirect...
    return redirect('/events');
  }
}