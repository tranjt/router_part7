import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
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

  const handleUpdateLikes = () => {
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const handleRemoveBlog = () => {
    removeBlog(blog)
  }

  return (
    <div id='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id='viewButton' onClick={toggleVisibility}>{viewOrHide}</button>
      <div style={showWhenVisible} className='togglableContent'>
        <p>{blog.url}</p>
        <p id='like'>{blog.likes} <button id='likeButton' onClick={handleUpdateLikes}>like</button></p>
        <p>{blog.user.name}</p>
        <button className='deleteButtonStyle' onClick={handleRemoveBlog}>delete</button>
      </div>
    </div>

  )
}


export default Blog
