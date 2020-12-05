import React, { useState, } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addBlog}>
        <Form.Group >
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={blogTitle}
            name='Title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id='author'
            type='test'
            value={blogAuthor}
            name='Author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>URL:</Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={blogURL}
            name='URL'
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm