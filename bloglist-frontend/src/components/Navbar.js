import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'
import { Nav, Button, Navbar } from 'react-bootstrap'


const NavBar = ({ authUser }) => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    dispatch(userLogout(authUser))
  }

  if (!authUser) { return (null) }

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="container-fluid">
        <Nav.Item >
          <Link className="text-white" style={padding} to="/">Blogs</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="text-white" style={padding} to="/users">Users</Link>
        </Nav.Item>
        {authUser
          ? <Nav.Item className="ml-auto" > <em className="text-white">{authUser.name} logged in <Button size='sm' onClick={handleLogout}>logout</Button></em>  </Nav.Item>
          : null
        }

      </Nav>
    </Navbar>
  )



}

export default NavBar