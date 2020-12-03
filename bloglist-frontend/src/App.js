import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
} from 'react-router-dom'

import Notification from './components/Notification'
import Users from './components/Users'
import Main from './components/Main'
import Login from './components/Login'
import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, userLogout } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const initUser = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(initUser))
    }
  }, [])

  const handleLogout = () => {
    dispatch(userLogout(authUser))
  }
  const padding = {
    padding: 5
  }
  return (
    <div>
      <Router>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        {authUser
          ? <em>{authUser.name} logged in <button onClick={handleLogout}>logout</button></em>
          : null
        }
        {authUser ? <h2>Blogs</h2> : null}
        <Notification />

        <Switch>
          <Route path='/users'>
            {authUser ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path='/'>
            {authUser ? <Main blogFormRef={blogFormRef} />
              : <Login />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default App