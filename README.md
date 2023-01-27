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









