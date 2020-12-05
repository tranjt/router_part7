import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import NewComment from '../components/NewComment'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

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

  if (!blog) { return (null) }
  return (
    <div id='blog' >
      <h2>{blog.title} {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <p id='like'>{blog.likes} likes <button id='likeButton' onClick={handleUpdateBlog}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <NewComment blogId={blog.id} />
      <ul>
        {blog.comments.map(comment =>
          <li key={comment._id}>{comment.comment} </li>)}
      </ul>

    </div>
  )

}

export default BlogView