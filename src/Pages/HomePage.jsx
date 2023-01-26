import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>Daaang ! HomePage
        <p>Click on this link to <Link to="products">Products</Link></p>
        {/* For  a link , relative path is appended to the current ur*/}
        {/* This means , a products link here will be appended t0 / here */}
        {/* With relative paths , we can have an attribute called relative , which can have its value as route or path*/}
        {/* Route is default , then path is relative to the route definition hierarcy*/}
        {/* Path mean that the path is relative to the current url , one segment back by ..  */}
    </div>
  )
}

export default HomePage