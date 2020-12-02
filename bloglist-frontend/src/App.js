import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, userLogout } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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
    dispatch(userLogout(user))
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }


  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogList />
    </div>
  )
}
export default App