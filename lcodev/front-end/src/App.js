import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoutes from './auth/helpers/PrivateRoutes'
import Cart from './core/Cart'
import Home from './core/Home'
import Login from './user/Login'
import Register from './user/Register'
import UserDashBoard from './user/UserDashBoard'





const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <PrivateRoutes exact path='/user/dashboard' component={UserDashBoard}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
