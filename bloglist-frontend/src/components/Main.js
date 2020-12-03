import React from 'react'
import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'

const Main = ({ blogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )
}


export default Main
