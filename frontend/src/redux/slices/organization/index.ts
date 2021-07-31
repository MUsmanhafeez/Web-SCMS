import { createSlice } from '@reduxjs/toolkit'
import {
  GqlMAddOrganization_addOrganization,
  GqlMAddOrganization_addOrganization_users,
  GqlMAddOrganization_addOrganization_users_organizations_users,
} from '@gqlTypes/asp'
import _ from 'lodash'
export interface IOrganizationState {
  organizations: GqlMAddOrganization_addOrganization[]
  activeOrgId: string
}
const initialState: IOrganizationState = {
  organizations: [],
  activeOrgId: null,
}

const organizationSlice = createSlice({
  name: `organizations`,
  initialState,
  reducers: {
    setActiveOrganizationid: (state, { payload }: { payload: string }) => {
      state.activeOrgId = payload
    },
    unSetActiveOrganizationid: (state) => {
      state.activeOrgId = ``
    },
    setOrganization: (
      state,
      { payload }: { payload: GqlMAddOrganization_addOrganization[] },
    ) => {
      state.organizations = payload
    },
    addOrganization: (
      state,
      { payload }: { payload: GqlMAddOrganization_addOrganization },
    ) => {
      const orgs = state.organizations
      orgs.push(payload)
      state.organizations = orgs
    },
    addMember: (
      state,
      payload: {
        payload: {
          orgId: string
          user: GqlMAddOrganization_addOrganization_users
        }
      },
    ) => {
      const org = state.organizations.filter(
        (org) => org.id !== payload.payload.orgId,
      )
      org[0].users.push(payload.payload.user)
      state.organizations = org
    },
  },
})

export const {
  setOrganization,
  addMember,
  addOrganization,
  setActiveOrganizationid,
  unSetActiveOrganizationid,
} = organizationSlice.actions
export default organizationSlice.reducer
