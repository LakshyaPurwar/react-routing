import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import ProductsPage from "./Pages/ProductsPage";
import SomeProduct from "./Pages/SomeProduct";

const router = createBrowserRouter([
  {
     path:'/' ,
      element:<Layout/> ,
      errorElement:<ErrorPage/>,
       children:[

    { index:true, path:'/' , element:<HomePage/> , },//This is example of an absolute path  , appended after the domain name

    { path :'products' , element:<ProductsPage/>},//This is an example of the relative path  , appended to the parent path

    { path:'products/:productId' , element:<SomeProduct/>}//Again , relative path

      ]
},
  
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
