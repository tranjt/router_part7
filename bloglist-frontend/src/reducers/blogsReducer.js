import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG': {
      const id = action.data.id
      const blogs = state.map(blog => {
        if (blog.id === id) {
          blog = action.data
        }
        return blog
      })
      return blogService.sortByLikes(blogs)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogService.sortByLikes(blogs)
    })
  }
}

export const setBlogs = blogs => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch({
        type: 'NEW_BLOG',
        data: blog,
      })
      dispatch(setNotification(`New blog '${blog.title}' by ${blog.author} added`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
    return 'done'
  }
}

export const updateBlog = (id, newBlog) => {
  return async dispatch => {
    try {
      const blog = await blogService.update(id, newBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: blog,
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
    return 'done'
  }
}


export default blogsReducer