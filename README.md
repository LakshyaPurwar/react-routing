# react-routing
Learning multi-page spa here

![p1 1](https://user-images.githubusercontent.com/78524327/214622317-94dfad86-b747-4ba1-8707-ff46970f4cd5.png)

![p1 2](https://user-images.githubusercontent.com/78524327/214622207-cff8bffd-f572-4906-89c6-3c11d45af3c2.png)

![p1 3](https://user-images.githubusercontent.com/78524327/214622168-cdce79af-06e3-45a7-8363-119de283126e.png)

![p1 4](https://user-images.githubusercontent.com/78524327/214622068-91096348-76e9-4d6b-9d9f-d1c570414ab4.png)

Alternate way : 
![image](https://user-images.githubusercontent.com/78524327/214656274-214f28e4-8051-40fc-b7d3-0b1b64cb8388.png)


## Navigating Programmatically : Without user action : 

`const navigate = useNavigate()`

`navigate('/products')`

## Dynamic Routing : Parameteric path segments

The dynamic path route object is added like this : 
```{ path:'/products/:productId' , element:<SomeProduct/>}```

Then , inside the rendered component , the user entered value of the parameter can be captured and used to dynamically display
the desired content : Using useParams
```
      const params = useParams();
      <h1>{params.productId}</h1>
```
### Dynamic Links : For products rendered from a list : To their dynamic routes

```javascript
     <Link to={'/products/'+product.id}>{product.title}</Link>
    
    OR
     
     <Link to={`/products/${product.id}`}>{product.title}</Link>
```

### Absolute Path Vs Relative Paths
1.Path starting with `/` is an absolute path , appended after domain name.

2.Path not starting with `/` represents a relative path.

In route definitions , relative path is relative to the parent or wrapping route path , like `/` of the layout.

In links , relative path generally seems to append to the current url.

But in relative path , an additional `relative` attribute comes in with 2 possible value : `path` and `route`

`route` is default , eg :  relative path `..` takes back to the wrapping/ parent route definition if relative = route.

If `relative='path'` , then `..` would take back to the previous path segment by removing just one segment...Interesting though.

![image](https://user-images.githubusercontent.com/78524327/214681975-58bcccda-6b63-43c1-a039-f9b32020dabf.png)

### Index Propery
 Applied to the default route that has the same path as a parent route , eg: Home element in the previous case :
 So, such elements/routes are called index elements:
 `{ index:true, path:'/' , element:<HomePage/> , }`
 
 ## Data Fetching using `loader` in Route : 
 
1. Instead of loading the data corresponding to a page , in useEffect , after the page has been rendered.

2.React Router offers a way of fetching data , as soon as a route or corresponding path is requested , before the component is mounted.

3.For , this we add this loader property and the fetching function in the route definition : Eg : The below route definition :
```javascript
{
        path: 'events/'
        , element: <EventPage/>,
        loader: async () => {
          const response = await fetch('http://localhost:8080/events');

          if (!response.ok) {
            //Some Error handling code here
          } else {
            const resData = await response.json();
            return resData.events;
            // setFetchedEvents(resData.events);
          }
        },
       }
```
4.The loaded data , that must be used in the page , is returned in the function.

5.Then , it can be accessed within the component using `useLoaderState` hoo :

![image](https://user-images.githubusercontent.com/78524327/214911960-7b5bd8a4-883e-41a9-a7fb-c3f2ac0926cf.png)

NOTE : 

0.The loader code should be put in the component as a separate function and then exported and used in the app.jsx.
![image](https://user-images.githubusercontent.com/78524327/214924766-889a593c-baab-4b20-9a93-14f6e4c56cc7.png)

![image](https://user-images.githubusercontent.com/78524327/214928593-eca01165-3c0d-488e-a953-9abfc154ba50.png)

1.useLoader can be accessed by all components inside our page component associated with the loader.

2.This loading takes place at time of navigating the url ,so in case of delay , this new page is rendered only after the data is loaded.
Till then , the previous page remains stuck.

3.using useNavigation , the loading state can be accessed and feedback be given on the previous page or the layout root page.

4.The useLoaderData can also resolve data out of the response object , so leverage that to reduce code.



```javascript
import { useNavigation } from 'react-router-dom'
      const navigation = useNavigation();
    const navigationState = navigation.state;
    {navigationState=='loading'  && <div>Loading ... </div>}
```

## Handling error state in loading with `loader` in react-router : 

1.If in the loader , response is not ok , we throw an error response.
json function allows us to construct an error response with ease.

![image](https://user-images.githubusercontent.com/78524327/215184979-69eae0d8-b1bd-4e37-9815-9be1e9421e3e.png)


2.If an error is thrown by the loader , the nearest errorElement will get displayed.
Within this error element , using the `useRouterError` hook , we can gain access to `error.status` and `error.data.message`.

![image](https://user-images.githubusercontent.com/78524327/215185216-3806f151-b9b6-4264-bebe-8419df8551a6.png)


3.To fetch the data for the dynamic route , we can also use loader.Interestingly , since we can only use the hooks such as useParams within the components,
still we can gain access to the route parameters in the loader functions paramters , automatically by react-router.

![image](https://user-images.githubusercontent.com/78524327/215185439-5489b06b-9010-4f16-ab8b-efc6b116d15e.png)

### Adding common loader for multiple routes.

1.For this , we simply create a parent route with the loader  , an id, without any element  , but children.

```javascript
{
          path:':eventId/' ,
          loader : eventDetails,
          id : 'event-loader-route',
          children:
          [
            { index:true , element: <EventDetailsPage />,action : eventDeleteAction },
            { path: 'edit', element: <EditEventPage /> }
          ],
          
        },
```

2.But , inside the children route , this loader data is extracted using a different `useRouteLoaderRoute('route_id_here')`.

```javascript
import { useRouteLoaderData } from 'react-router-dom';
const data = useRouteLoaderData('event-loader-route');
```

## Handling Form submissions using Actions via React-Router

1.Instead of the traditional method of tracking form data and having a submit handler , this can be simplified using actions.

Firstly , form is modified as : to a `<Form>` component : Mention the method : 
```javascript
import { Form } from 'react-router-dom';
<Form method='post' className={classes.form}>
```
2.On submit  , the nearest action function associated with the current route will be triggered.
In the action function , this form data , method  and route parameters will be directly accessible : 

```javascript
//This action function is made inside the route page where the form is : 
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
```
The action is mentioned in the route definition : 
`{ path: 'new', element: <NewEventPage />  , action:newEventAction},`

3.Now , we can programmatically call the action , not just via form submission : 
Eg : On click of the delete button. Also , route paramters can be directly accessed in action as in loader

```javascript
import { useSubmit } from 'react-router-dom';
const submit = useSubmit();
//Then to trigger the action , submit is called with data (null here) and metadata
submit(null , {method : 'delete'});
```
Again , this is accessed in the same way in the action function : 

```javascript
export async function ActionFunction({params , request}){
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/'+eventId,{
    method:request.method,
  });

```

### Loading / Submitting state
Again using useNavigation , the submitting state can be handled.
```javascript
import { useNavigation } from 'react-router-dom';
 const navigation = useNavigation();
 let isSubmitting = navigation.state==='submitting';
 <button disabled={isSubmitting}>{isSubmitting ? 'Submitting ... ' : 'Save'}</button>
  
```

## Error response on form submission by Backend
 In such case , backend return response with status 422.
 With such error , error page must not be displayed , but the form with error message.
 
 For this , the obtained response is returned by the action function.
 
 Just like the response by loader can be accessed inside the route components, similarly the action data
  `useActionData` hook
  ```javascript
  import { useActionData } from 'react-router-dom';
  
  const actionData = useActionData();
  
  {actionData && actionData.message}
    {actionData && actionData.errors && <ul> {Object.values(actionData.errors).map((err)=>{
      console.log(err);
      return <li key={err}>{err}</li>}) }</ul>}

  ```
  `Object.values(objectName)` is great to loop through javascript object values.
  
  ### Common action function for adding new event and editing
  The method in form provided the differentiation , `POST` vs `PATCH`
  ```javascript
  
  export async function FormAction({request , params})
  {
      // If method is POST
    let url = 'http://localhost:8080/events';
    //If method is PATCH
    if(request.method === 'PATCH')
    {
      url = 'http://localhost:8080/events/'+params.eventId;

    }
    //For fetch
      method = request.method;
  }
  
  
  ```
  
  ![image](https://user-images.githubusercontent.com/78524327/215282138-3e639a17-d089-4824-bf70-f63719ca6028.png)
  
  ## Route Transitions
  
  #### NOTE : Normal Form component causes route transition to the action='/event' , action url in addition to calling the associated action.
  #### That is why . navigation.state could tell us about loading or submitting states.
  
  ##  `useFetcher` , `fetcher.Form` , `fetcher.data` and `useFetch.state` :
  #### useFetch provides an alternative form , which does not cause route transition to the mentioned action route.
  #### Used when a form in another component wants the action of some other route , without going to that route.
  #### Here , the data returned by the action is obtained throught fetcher.data and the state through fetched.state
  
  ![image](https://user-images.githubusercontent.com/78524327/215284066-03055fb8-5f21-48f9-8413-4f446a928a25.png)
![image](https://user-images.githubusercontent.com/78524327/215284105-85dff169-b3c2-4a08-94c7-e31bcbef7fd8.png)
![image](https://user-images.githubusercontent.com/78524327/215284137-8c2c7fcb-c9f7-46c6-91c0-19fc98f23f47.png)








