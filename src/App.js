import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import ProductsPage from "./Pages/ProductsPage";

const router = createBrowserRouter([
  {
     path:'/' ,
      element:<Layout/> ,
      errorElement:<ErrorPage/>,
       children:[

    { path:'/' , element:<HomePage/> , },

    { path :'/products' , element:<ProductsPage/>}

      ]
},
  
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
