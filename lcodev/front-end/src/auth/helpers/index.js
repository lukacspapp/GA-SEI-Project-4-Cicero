/* eslint-disable eqeqeq */
/* eslint-disable quotes */
import { cartEmpty } from '../../core/helper/cartHelper'


export const signUp = async (user) => {
  return fetch('http://127.0.0.1:8000/api/user/', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}


export const signIn = async (user) => {
  const formData = new FormData()
  // const {email, password} = user;
  // const formData = new FormData();
  // formData.append('email', email)
  // formData.append('password', password)
  for (const name in user) {
    console.log(user[name])
    formData.append(name, user[name])
  }

  // const { email, password } = user
  // const formData = new FormData()
  // formData.append('email', email)
  // formData.append('password', password) this is the same as above 

  // eslint-disable-next-line prefer-const
  for (let key of formData.keys()){ 
    console.log('MYKEY',key)
  }


  return fetch('http://127.0.0.1:8000/api/user/login/', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      console.log('Success', response)
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem('token', JSON.stringify(data))
    next()
  }
}

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'))
  } else {
    return false
  }
}

export default isAuthenticated

export const signOut = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id
  if (typeof window !== undefined) {
    localStorage.removeItem('token')
    cartEmpty(() => {
      console.log('cart is empty')
    })

    // next()

    return fetch(`http://127.0.0.1:8000/api/user/logout/${userId}/`, {
      method: 'GET',

    })
      .then(response => {
        console.log(response, 'Signout Success')
        next()
      })
      .catch((err) => console.log(err))
  }
}