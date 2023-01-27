import React from 'react'
import { json, useParams } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
const EventDetailsPage = () => {
  // const params = useParams();
  const data = useLoaderData();
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