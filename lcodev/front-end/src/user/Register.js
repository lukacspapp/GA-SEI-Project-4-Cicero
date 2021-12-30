/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signUp } from '../auth/helpers'



const Register = () => {


  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { name, email, password, error, success } = values


  const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value })
    }


  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false })
    signUp({ name, email, password })
      .then(data => {
        console.log('DATA', data)
        if (data.email === email) {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          })
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          })
        }
      })
      .catch(e => console.log(e))
  } 

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div className='alert alert-success' style={{ display: success ? '' : 'none' }} >
            New Account Created Successfully, Please <Link to='/signin'>Login!</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div className='alert alert-danger' style={{ display: error ? '' : 'none' }} >
            Something Went Wrong! Please try again
          </div>
        </div>
      </div>
    )
  }

  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                value={name}
                onChange={handleChange('name')}
                type='text'
                className='form-control'>
              </input>
            </div>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                value={email}
                onChange={handleChange('email')}
                type='text'
                className='form-control'>
              </input>
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                value={password}
                onChange={handleChange('password')}
                type='password'
                className='form-control'>
              </input>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success mt-4" onClick={onSubmit} type="button">Submit</button>
            </div>
          </form>

        </div>
      </div>
    )
  }



  return (
    <Base title='Sign Up Page' description='Register with us'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className='text-white text-center'>
        {/* {JSON.stringify(values)} */}
      </p>

    </Base>
  )

}

export default Register
