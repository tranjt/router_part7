import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogsReducer'

const NewComment = ({ blogId }) => {
  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    const content = { comment: event.target.comment.value }

    event.target.comment.value = ''
    dispatch(createComment(blogId, content))
  }

  return (
    <form onSubmit={addComment}>
      <input name="comment" />
      <button type="submit">add comment</button>
    </form>
  )
}

export default NewComment