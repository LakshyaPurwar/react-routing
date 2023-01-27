import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  //This is the error response  , not the resolved data.
  //In this error object , status can be accessed as error.status.
  //The data can be accessed as error.data.
  let message = 'Something went wrong!';
  console.log(error.status);
  if(error.status === 500)
  {
    message = error.data.message;
  }
  if(error.status===404)
  {
    message = 'Not a page that belongs to us!!'
  }
  console.log(error.status);
  return (
    <div>
      <h1>Some Error Occured!</h1>
      <p>{message}</p>
    </div>
  )
}

export default ErrorPage