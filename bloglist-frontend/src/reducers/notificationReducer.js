const notificationReducer = (state = { text: null, classname: '' }, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutID

export const setNotification = (text, classname, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      notification: {
        text,
        classname
      }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

const clearNotification = () => {
  return {
    type: 'NEW_NOTIFICATION',
    notification: {
      text: null,
      classname: ''
    }
  }
}



export default notificationReducer