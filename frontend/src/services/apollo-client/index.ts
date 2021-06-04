import { AppProps } from 'next/app'
import { useMemo } from 'react'
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  from,
  ServerError,
} from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { onError } from '@apollo/client/link/error'
import { getMultipleClientLinks } from './utils'

import { ASP_BACKEND_APP_URI } from '@config'
import { setContext } from '@apollo/client/link/context'
import { UserManager } from '@services'

export const APOLLO_STATE_PROP_NAME = `__APOLLO_STATE__`

let apolloClient: ApolloClient<NormalizedCacheObject>

const getAccessToken = async () => {
  const user = await UserManager.getUser()
  if (user) {
    const newUser = user.expired
      ? await UserManager.signinSilent({
          resource: ASP_BACKEND_APP_URI,
        })
      : user
    if (newUser.expired) {
      UserManager.signoutCallback()
      return null
    }
    return newUser.access_token
  }
  return null
}

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await getAccessToken()
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  }
})

const apolloLink = new ApolloLink((operation, forward) => forward(operation))

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      return console.error(
        `[GraphQL error]: Message: ${JSON.stringify(message)}`,
      )
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    if (
      networkError.name === `ServerError` &&
      (networkError as ServerError).statusCode === 401
    ) {
      // remove cached token on 401 from the server
      UserManager.signoutCallback()
    }
  }
})

const clientLinks = getMultipleClientLinks()

const apolloLinks = from([authLink, apolloLink, errorlink, ...clientLinks])

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === `undefined`,
    link: apolloLinks,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: `network-only`,
      },
    },
  })
}

export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const newApolloClient = apolloClient ?? createApolloClient()
  if (initialState) {
    const existingCache = newApolloClient.extract()
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    })
    newApolloClient.cache.restore(data)
  }
  if (typeof window === `undefined`) return newApolloClient
  if (!apolloClient) apolloClient = newApolloClient
  return newApolloClient
}

export function useApollo(
  pageProps: AppProps,
): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
