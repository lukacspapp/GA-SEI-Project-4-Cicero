/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { authenticate, isAuthenticated, signIn } from '../auth/helpers'
import Base from '../core/Base'






const Login = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false ,
    didRedirect: false,
  })  

  const { name, email, password, error, success, loading, didRedirect } =
    values


  const handleChange = name =>   // if user is filling in the name field the higher order function will call the set value for the name same for the email and other fileds
    event => {
      setValues({ ...values, error: false, [name]: event.target.value })
    }

  const onSumit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })

    signIn({ email, password })
      .then((data) => {
        console.log('DATA', data)
        if (data.token) {
          // let sessionToken = data.token
          authenticate(data, () => {
            console.log('Token Added')
            setValues({
              ...values,
              didRedirect: true,
            })
          })
        } else {
          setValues({
            ...values,
            loading: false,
          })
        }
      })
      .catch(e => console.log(e))
    performRedirect()
  }

  const performRedirect = () => {
    if (isAuthenticated()) {
      return (
        <Redirect to='/' />
      )
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Getting you Logged In.....</h2>
        </div>
      )
    )
  }

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}>
            Success, You are one of us now! Please <Link to='/singin'> login!</Link> 
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            Check all filed again
          </div>
        </div>
      </div>
    )
  }

  const signInForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                className='form-control'
                value={email}
                onChange={handleChange('email')}
                type='text'
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                className='form-control'
                value={password}
                onChange={handleChange('password')}
                type='password'
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success mt-4" onClick={onSumit} type="button">Button</button>
            </div>
          </form>
        </div>
      </div>
    )
  }


  return (
    <Base title='Welcome to Cicero' description='Nice To See you Again!'>
      {loadingMessage()}
      {signInForm()}
      <p className='text-center'>
        {/* {JSON.stringify(values)} */}
      </p>
      {performRedirect()}
    </Base>
  )
}

export default Login