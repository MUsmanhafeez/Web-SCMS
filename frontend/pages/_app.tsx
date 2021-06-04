import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@services'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from '@providers'

import { AppProps } from 'next/app'
import { Main } from '@components/main'
import { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps)
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Main>
              <Component {...pageProps} />
            </Main>
          </AuthProvider>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
