import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs, updateBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import Blog from '../components/Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const handleUpdateBlog = (id, updatedBlog) => {
    dispatch(updateBlog(id, updatedBlog))
  }

  const removeBlog = (delBlog) => {
    if (window.confirm(`Delete '${delBlog.title}' by ${delBlog.author}?`)) {
      blogService.remove(delBlog.id)
        .then(() => {
          const newBlogs = blogs.filter(blog => blog.id !== delBlog.id)
          dispatch(setBlogs(newBlogs))
          dispatch(setNotification(`Blog '${delBlog.title}' by ${delBlog.author} deleted`, 'success', 5))

        }).catch(error => {
          dispatch(setNotification(error.response.data.error, 'error', 5))
        })
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default BlogList