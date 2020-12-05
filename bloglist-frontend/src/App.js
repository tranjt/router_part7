import React, { useEffect } from 'react'
import {
  Switch, Route,
  Redirect, useRouteMatch
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Main from './components/Main'
import Login from './components/Login'
import BlogView from './components/BlogView'
import NavBar from './components/Navbar'



const App = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const initUser = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(initUser))
    }
  }, [])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      <NavBar authUser={authUser} />
      {authUser ? <h2>blog app</h2> : null}
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          {authUser ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path='/blogs/:id'>
          {authUser ? <BlogView blog={blog} /> : <Redirect to="/login" />}
        </Route>
        <Route path='/'>
          {authUser ? <Main blogFormRef={blogFormRef} />
            : <Login />
          }
        </Route>
      </Switch>
    </div>
  )
}


export default App