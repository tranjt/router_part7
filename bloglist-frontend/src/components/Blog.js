import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const viewOrHide = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleUpdateBlog = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div id='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id='viewButton' onClick={toggleVisibility}>{viewOrHide}</button>
      <div style={showWhenVisible} className='togglableContent'>
        <p>{blog.url}</p>
        <p id='like'>{blog.likes} <button id='likeButton' onClick={handleUpdateBlog}>like</button></p>
        <p>{blog.user.name}</p>
        <button className='deleteButtonStyle' onClick={handleRemoveBlog}>delete</button>
      </div>
    </div>

  )
}


export default Blog
