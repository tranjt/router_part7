import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Table striped bordered hover>
      <tbody>

        {blogs.map(blog =>
          <tr key={blog.id} >
            <td><Link to={`/blogs/${blog.id}`}>{blog.title} </Link></td><td>{blog.author}</td>
          </tr>
        )}

      </tbody>
    </Table>
  )
}

export default BlogList