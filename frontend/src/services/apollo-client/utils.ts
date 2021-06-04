import { HttpLink, ApolloLink } from '@apollo/client'
import {
  APOLLO_CLIENTS_INFO,
  APOLLO_CLIENT_DEFAULT,
  IApolloClientInfo,
} from '@config'

export const getMultipleClientLinks = (): ApolloLink[] => {
  return Object.keys(APOLLO_CLIENTS_INFO).map((clientName) => {
    const clientInfo = APOLLO_CLIENTS_INFO[clientName]
    const isDefaultLink = clientInfo.URI == APOLLO_CLIENT_DEFAULT.URI
    const httpLink = new HttpLink({
      uri: clientInfo.URI,
      credentials: `same-origin`,
    })
    return ApolloLink.split((operation) => {
      const client: IApolloClientInfo = operation.getContext().client
      return isDefaultLink
        ? client === undefined
        : client.URI === clientInfo.URI
    }, httpLink)
  })
}
