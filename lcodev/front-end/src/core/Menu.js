/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signOut } from '../auth/helpers'




const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#2ecc72' }
  } else {
    return { color: '#FFFFFF' }
  }
}


// eslint-disable-next-line no-unused-vars
const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link style={currentTab(history, '/')} className='nav-link' to='/'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link style={currentTab(history, '/cart')} className='nav-link' to='/cart'>Cart</Link>
        </li>

        {isAuthenticated() && (
          <li className='nav-item'>
            <Link style={currentTab(history, '/user/dashboard')} className='nav-link' to='/user/dashboard'>User Dashboard</Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className='nav-item'>
              <Link style={currentTab(history, '/signup')} className='nav-link' to='signup'>Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, '/signin')} className="nav-link" to="/signin">Log In</Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className='nav-item'>
            <span onClick={() => {
              signOut(() => {
                history.push('/')
              })
            }} className='nav-link text-warning'>Sign out</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default withRouter(Menu)