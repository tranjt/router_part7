import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  authUser: userReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store