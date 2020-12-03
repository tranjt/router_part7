import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    const sortedUsers = usersService.sortByBlogCount(users)
    dispatch({
      type: 'INIT_USERS',
      data: sortedUsers
    })
  }
}

export default usersReducer