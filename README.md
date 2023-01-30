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
 # Authentication
 
 ![image](https://user-images.githubusercontent.com/78524327/215475603-829e308d-35f5-4af0-b0c5-61300b3eb6a7.png)
![image](https://user-images.githubusercontent.com/78524327/215475620-20f646ae-93ba-4abe-9625-0f8c49863374.png)
![image](https://user-images.githubusercontent.com/78524327/215475633-b6444b02-8997-4229-acba-a9ab817ff031.png)

 
 ## I.Validation user input and outputting error in the input component
 
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
 
 ## II.Dealing with auth tokens
 
 ```javascript
 //Login Successfully done
  //Then a token must have been awarded
  //That must be handled properly
  const resData = await response.json();
  const token = resData.token;
  //Here , since token expires in 1hr , an expiration time is also stored in the local storage
  localStorage.setItem('token' , token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration',expiration.toISOString());
  return redirect('/');
 ```
  
  ### Function to access the token when required in a util file Auth.js
 ![image](https://user-images.githubusercontent.com/78524327/215476686-e3052d9f-7aac-4390-bafd-09d579dbdf97.png)
 
 ### For backend requests that are restricted to authorized users , the token must be attached as such : 
 
 ![image](https://user-images.githubusercontent.com/78524327/215476940-51c5c7aa-1b3d-436b-9eed-032f5ea215d1.png)
 
 ## Adding logout
 ```javascript
 <Form action='/logout' method='post'>
            <button >Logout</button
 </Form>
 ```
 The logout action  : 
 ![image](https://user-images.githubusercontent.com/78524327/215478686-06ee20b7-2fe4-4e62-94e5-312e47c371e7.png)
 
 
 #### A logout path with no component , but action ` { path : 'logout' , action:logoutAction},`
 
 
 

 


 
 
 
 
 
 
