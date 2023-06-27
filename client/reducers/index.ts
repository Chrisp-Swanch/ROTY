import { combineReducers } from 'redux'

import usersReducers from './users'
import rocksReducers from './rocks'

export default combineReducers({
  users: usersReducers,
  rocks: rocksReducers,
})
