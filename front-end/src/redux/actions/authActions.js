import axios from 'axios';
import { LOGIN, REGISTER, IS_LOGGEDIN, LOGOUT, REQUEST_PASS_TOKEN } from '../actionTypes';

export const register = (body) => async (dispatch) => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  const result = await axios(config)
  dispatch({
    type: REGISTER,
    payload: result.data.msg
  })
}

export const login = (body) => async (dispatch) => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  const result = await axios(config)
  if (result.data.err) {
    dispatch({
      type: LOGIN,
      payload: { isAuth: false, userLogin: null }
    })
  }
  else {
    
      localStorage.setItem('token', result.data.authtoken)
    dispatch({
      type: LOGIN,
      payload: { isAuth: true, userLogin: result.data.authtoken }
    })
  }

}
export const requestPass = (body) => async (dispatch) => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/request_pass_token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  const result = await axios(config)

    dispatch({
      type: REQUEST_PASS_TOKEN,
      payload: result.data
    })

}


export const isAuthenticated = () => async (dispatch) => {
  if ( localStorage.getItem('token')) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user/profile`,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token') || localStorage.getItem('token')
        }
      };

      const result = await axios(config)
      if (result.data.err) {
        sessionStorage.clear()
        localStorage.clear()
        dispatch({
          type: IS_LOGGEDIN,
          payload: { isAuth: false, userProfile: null }
        })
      }
      else {
        dispatch({
          type: IS_LOGGEDIN,
          payload: { isAuth: true, userProfile: result.data }
        })
      }
    
  }
}
export const logout = () => (dispatch) => {
  sessionStorage.clear()
  localStorage.clear()
  dispatch({
    type: LOGOUT,
    payload: null
  })
}