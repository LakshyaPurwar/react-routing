# REACT AUTHENTICATION

## Search Or Query Parameters
#### 1. If we want to render the same route in different modes , then adding query selector to route could be one good option.

#### 2.Eg , the login/signup form could be displayed in different ways depeding upon a state
#### 3.But this different modes can be obtained by checking query params  like `javascrpt localhost:3000/auth?mode=login ` Or `/auth?mode=signup`.
#### 4.This can be accessed in the component as  : 

```javascript
//Link to the same route but with added info.
<NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
```
```javascript
  import { useSearchParams } from 'react-router-dom';
   const [searchParams , setSearchParams] = useSearchParams();
   const isLogin = searchParams.get('mode') === 'login';
   <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
   <Link to={`?mode=${isLogin?'signup':'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          
          
   //In this mannerism , the search params can be accessed and component and the ui can be  managed accordingly
```

#### 4.Also , the action the mode can be accessed by the action associated with the form , and different tasks/http requests be made accordingly.
 ```javascript
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
 ```
 
 
 ## II.Validation user input and outputting error in the input component
 
 #### 1.Just client side auth is not enough as it can be altered in the browser.
 #### 2.In the action of form submission , if the server finds errors , it may respond accordigly (Eg : 422 status code)
 #### 3.This response should be checked in the action , and if(status==422) suppose , then this response should be forwarded to the form compnent for feedback.
 
 ```javascript
 if(response.status === 422 || response.status === 401)
  {
    //We do not wanna throw an error
    //But show this on the error page by returning the resposne here.
    return response;
  }
 
 
 ```
 
 ```javascript
//In the form , the returned action response can be accessed and accordingly , feedback can be given.

import { useActionData } from 'react-router-dom';
const data = useActionData();
    //The feedback can be given inside the form as : 
    
          {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((errorValue)=>{
            return <li key={errorValue}>{errorValue}</li>
          })}
          </ul>)}

          {data && data.message && <p>{data.message}</p>}
 
 
 ```
 
 
 
 
