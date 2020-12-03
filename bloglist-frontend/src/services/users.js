import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const sortByBlogCount = (users) => {
  return users.sort((a, b) => b.blogs.length - a.blogs.length)
}

// eslint-disable-next-line
export default { getUsers, sortByBlogCount }