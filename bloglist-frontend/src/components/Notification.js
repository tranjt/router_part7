import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <Alert variant={notification.classname}>
      {notification.text}
    </Alert>
  )
}

export default Notification