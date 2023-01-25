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


