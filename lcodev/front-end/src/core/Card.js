/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import isAuthenticated from '../auth/helpers'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'




const Card = ({ product, addtoCart = true, removeFromCart = false, reload = undefined, setReload = (f) => f }) => {


  const [redirect, setRedirect] = useState(false)


  const cardTitle = product ? product.name : 'Cart title'
  const cardDescription = product ? product.description : 'Card Description'
  const cardPrice = product ? product.price : 'Card Price'



  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true))
      console.log('Added to Cart')
    } else {
      console.log('Log In Please!')
    }
  }

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const showAddToCart = addToCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className='btn btn-block btn-outline-success mt-2 mb2'
        >
          Add to Cart
        </button>
      )
    )
  }

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product.id)
            setReload(!reload)
            console.log('product removed from cart')
          }}
          className='btn btn-block btn-outline-danger mt-2 mb2'
        >
          Remove From Cart
        </button>
      )
    )
  }


  return (
    <div className='card text-white bg-dark border border-info'>
      <div className='card-header lead' style={{ fontWeight: 'bold' }}>{cardTitle}</div>
      <div className='card-body'>
        {getRedirect(redirect)}
        <div className='roundend border border-success p-2'>
          <img
            src={product.image}
            alt='photo'
            style={{
              maxHeight: '100%', maxWidth: '100%' }}
            className='card-img-top mb-2 rounded sm'
          ></img>
        </div>
        <p className='card description lead bg-success font-weight-normal text-wrap p-3'>{cardDescription}</p>
        <p className='btn btn-success rounded btn-sm px-4'>$ {cardPrice}</p>
        <div className='row'>
          <div className='col-12'>
            {showAddToCart(addToCart)}
          </div>
          <div className='col-12'>
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card