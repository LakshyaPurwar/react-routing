import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>Daaang ! HomePage
        <p>Click on this link to <Link to="/products">Products</Link></p>
    </div>
  )
}

export default HomePage