import { ASP_BACKEND_APP_URI } from '@config'

export interface IApolloClientInfo {
  URI: string
}

export const APOLLO_CLIENTS_INFO = {
  ASP: {
    URI: `${ASP_BACKEND_APP_URI}/graphql`,
  },
}

export const APOLLO_CLIENT_DEFAULT = APOLLO_CLIENTS_INFO.ASP
