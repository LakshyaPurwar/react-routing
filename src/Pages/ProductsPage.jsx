import React from 'react'
import { Link } from 'react-router-dom';
const PRODUCTS = [{id : 'p1' , title : "Product 1"},{ id : 'p2' , title : "Product 2"},{id :'p3' ,title : "Product 3"}];

const ProductsPage = () => {
  return (
    <>
    <div>Daaanng! ProductsPage</div>
    <p>Products</p>
    {PRODUCTS.map((product)=>{
      return <div  key = {product.id} className="abc"><Link to={'/products/'+product.id}>{product.title}</Link></div>
    })}

    </>)
    
}

export default ProductsPage