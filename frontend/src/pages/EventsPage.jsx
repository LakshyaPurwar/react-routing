
import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  //Even if the returned data is a promise : 
  //Then , the useLoaderData will resolve this for us
  return (
    <>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

export async function LoaderFunction(){

  const response = await fetch('http://localhost:8080/events');
  if(!response.ok)
  {
    throw json({message : 'Could not fetch '},{status:500});
  }
  else
  {
    return response;
  }
  

}