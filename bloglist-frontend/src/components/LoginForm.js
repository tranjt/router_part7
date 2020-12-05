import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group >
        <Form.Label>Username:</Form.Label>
        <Form.Control
          id='username'
          type='text'
          value={username}
          name='Username'
          placeholder="Enter username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control id='password'
          type='password'
          value={password}
          name='Password'
          placeholder="Enter password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}


export default LoginForm
