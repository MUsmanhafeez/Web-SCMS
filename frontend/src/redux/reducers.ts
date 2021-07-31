import { combineReducers } from 'redux'

import user from '@redux/slices/user'
import organization from '@redux/slices/organization'

const rootReducer = combineReducers({
  user,
  organization,
})

export type RootState = ReturnType<typeof rootReducer>

export { rootReducer }
