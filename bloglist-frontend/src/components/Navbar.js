import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'

const NavBar = ({ authUser }) => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }
  const navStyle = {
    padding: 10,
    marginBottom: 5,
    background: '#d3d3d3'
  }

  const handleLogout = () => {
    dispatch(userLogout(authUser))
  }

  if (!authUser) { return (null) }
  return (
    <div style={navStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {authUser
        ? <em>{authUser.name} logged in <button onClick={handleLogout}>logout</button></em>
        : null
      }
    </div>
  )

}

export default NavBar