import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm/>;
}

export default AuthenticationPage;

export async function action({request , params})
{
  console.log("Action was triggered!!!");
  const data =await request.formData();
  const authData = {
    email : data.get('email'),
    password : data.get('password'),
  }

  //The url depends upon the mode in which this form
  //or rather this page was displayed.
  //So , we can grab the searchParams here.
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if(mode!=='login' && mode!=='signup')
  {
    throw json({message : 'Invald Mode.'},{status : 422});
  }

  const url = 'http://localhost:8080/'+mode;
  const response = await fetch(url , {
    method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(authData),
  });
  console.log(response);

  if(response.status === 422 || response.status === 401)
  {
    //We do not wanna throw an error
    //But show this on the error page by returning the resposne here.
    return response;
  }

  if(!response.ok)
  {
    throw json({message : 'Could not authenticate!'} , {status : 500});
  }

  //Successfully done
  //Then a token must have been awarded
  //That must be handled properly
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem('token' , token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration',expiration.toISOString());
  return redirect('/');


}