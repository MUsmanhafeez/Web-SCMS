import { combineReducers } from 'redux'

import user from '@redux/slices/user'

const rootReducer = combineReducers({
  user,
})

export type RootState = ReturnType<typeof rootReducer>

export { rootReducer }
