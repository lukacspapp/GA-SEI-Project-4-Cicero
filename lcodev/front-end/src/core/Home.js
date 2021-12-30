import React, { useState, useEffect } from 'react'
import Base from './Base'
import Card from './Card'
import getProducts from './helper/coreapicalls'




const Home = () => {

  

  const [products, setProducts] = useState([])
  const [err, setErr] = useState(false)

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setErr(data.error)
          console.log(err)
        } else {
          setProducts(data)
        }
      })
  }

  useEffect(() => {
    loadAllProducts()
    // eslint-disable-next-line
  }, [])


  return (
    <Base title='Welcome to Cicero' description='World of Hipster Hats'>
      {err}
      <div className='row'>
        {products.map((product, index) => {
          return (
            <div key={index} className='col-4 mb-4'>
              <Card product={product}/>
            </div>
          )
        })}
      </div>
    </Base>
  )
}

export default Home