import React from 'react'

const Notification = ({ notification }) => {

  const styleForNotification = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const style = notification !== '' ? styleForNotification : {}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification