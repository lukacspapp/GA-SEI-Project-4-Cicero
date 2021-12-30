/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { cartEmpty } from './helper/cartHelper'
import { getmeToken, processPayment } from './helper/paymentHelper'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated, signOut } from '../auth/helpers'

import DropIn from 'braintree-web-drop-in-react'


const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  })

  const userId = isAuthenticated && isAuthenticated().user.id
  const token = isAuthenticated && isAuthenticated().token

  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          })
          signOut(() => {
            return <Redirect to="/" />
          })
        } else {
          const clientToken = info.clientToken
          setInfo({ clientToken })
        }
      })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [])

  const getAmount = () => {
    let amount = 0
    products.map((p) => {
      amount = amount + parseFloat(p.price)
    })
    return amount
  }
  const onPurchase = () => {
    setInfo({ loading: true })
    let nonce
    let getNonce = info.instance.requestPaymentMethod().then((data) => { // request payment method is creating the nonce
      console.log('MYDATA', data)
      nonce = data.nonce
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      }
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log('POINT-1', response)
          if (response.error) {
            if (response.code === '1') {
              console.log('PAYMENT FAILED!')
              signOut(() => {
                return <Redirect to="/" />
              })
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false })
            console.log('PAYMENT SUCCESS')

            let productNames = ''
            products.forEach(function (item) {
              productNames += item.name + ', '
            })

            const orderData = {
              products: productNames,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            }
            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.code === '1') {
                    console.log('Order Failed!')
                    signOut(() => {
                      return <Redirect to="/" />
                    })
                  }
                } else {
                  if (response.success === true) {
                    console.log('ORDER PLACED!!')
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false })
                console.log('Order FAILED', error)
              })
            cartEmpty(() => {
              console.log('Did we got a crash?')
            })

            setReload(!reload)
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false })
          console.log('PAYMENT FAILED', error)
        })
    })
  }

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0
          ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              >
              </DropIn>
              <button
                onClick={onPurchase}
                className="btn btn-block btn-success"
              >
                Buy Now
              </button>
            </div>
          )
          : (
            <h3>Please login first or add something in cart</h3>
          )}
      </div>
    )
  }

  return (
    <div>
      <h3>${getAmount()} To Pay</h3>
      {showbtnDropIn()}
    </div>
  )
}

export default PaymentB
