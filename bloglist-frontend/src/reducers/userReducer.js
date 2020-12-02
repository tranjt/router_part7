import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeUser = user => {
  blogService.setToken(user.token)
  return {
    type: 'LOGIN',
    data: user
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      dispatch(setNotification(`${user.name} logged in`, 'success', 5))

    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
    return 'done'
  }
}

export const userLogout = (user) => {
  return dispatch => {
    dispatch(setNotification(`${user.name} logged out`, 'success', 5))
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
    blogService.setToken(null)
  }
}


export default userReducer