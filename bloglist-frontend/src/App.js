import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const sortByLikes = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortByLikes(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} logged in`, 'success', 5))

    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const handleLogout = () => {
    dispatch(setNotification(`${user.name} logged out`, 'success', 5))
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        blogFormRef.current.toggleVisibility()
        const sortedBlogs = sortByLikes(blogs.concat(returnedBlog))
        setBlogs(sortedBlogs)
        dispatch(setNotification(`New blog '${newBlog.title}' by ${newBlog.author} added`, 'success', 5))

      }).catch(error => {
        dispatch(setNotification(error.response.data.error, 'error', 5))
      })
  }

  const updateBlogs = (id, newObject) => {
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    const newBlogList = [...blogs]
    newBlogList[blogIndex] = { ...newBlogList[blogIndex], likes: newObject.likes }
    setBlogs(sortByLikes(newBlogList))
  }

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        updateBlogs(id, returnedBlog)

      }).catch(error => {
        dispatch(setNotification(error.response.data.error, 'error', 5))
      })
  }


  const removeBlog = (delBlog) => {
    if (window.confirm(`Delete '${delBlog.title}' by ${delBlog.author}?`)) {
      blogService.remove(delBlog.id)
        .then(() => {
          const newBlogs = blogs.filter(blog => blog.id !== delBlog.id)
          setBlogs(newBlogs)
          dispatch(setNotification(`Blog '${delBlog.title}' by ${delBlog.author} deleted`, 'success', 5))

        }).catch(error => {
          dispatch(setNotification(error.response.data.error, 'error', 5))
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}
export default App