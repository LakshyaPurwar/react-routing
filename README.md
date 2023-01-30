# REACT AUTHENTICATION

## Search Or Query Parameters
#### 1. If we want to render the same route in different modes , then adding query selector to route could be one good option.

#### 2.Eg , the login/signup form could be displayed in different ways depeding upon a state
#### 3.But this different modes can be obtained by checking query params  like `javascrpt localhost:3000/auth?mode=login ` Or `/auth?mode=signup`.
#### 4.This can be accessed in the component as  : 

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
