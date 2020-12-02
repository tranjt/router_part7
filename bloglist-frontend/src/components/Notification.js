import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div className={notification.classname}>
      {notification.text}
    </div>
  )
}

export default Notification