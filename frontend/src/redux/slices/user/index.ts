import { createSlice } from '@reduxjs/toolkit'
import { GqlUser_user } from '@gqlTypes/asp'

interface IUserState {
  user: GqlUser_user
  isLoadingUser: boolean
}

const initialState: IUserState = {
  user: {
    __typename: `UserDto`,
    email: null,
    firstName: null,
    lastName: null,
    id: null,
  },
  isLoadingUser: false,
}

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: GqlUser_user }) => {
      state.user = payload
      state.isLoadingUser = false
    },
    unsetUser: (state) => {
      state.user = initialState.user
      state.isLoadingUser = false
    },
    loadingUser: (state) => {
      state.isLoadingUser = true
    },
  },
})

export const { setUser, unsetUser, loadingUser } = userSlice.actions

export default userSlice.reducer
