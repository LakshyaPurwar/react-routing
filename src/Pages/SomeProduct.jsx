import React from 'react'
import { useParams } from 'react-router'


const SomeProduct = () => {
    const params = useParams();
  return (
    <>
    <div>SomeProduct</div>
    <h1>{params.productId}</h1>
    </>
    

  )
}

export default SomeProduct