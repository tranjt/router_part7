import React, { useState, } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ blogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
    }
    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title <input
            id='title'
            type='text'
            value={blogTitle}
            name='Title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author <input
            id='author'
            type='test'
            value={blogAuthor}
            name='Author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL <input
            id='url'
            type='text'
            value={blogURL}
            name='URL'
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button
          type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm