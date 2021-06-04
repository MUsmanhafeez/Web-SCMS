import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { Provider } from 'react-redux'
import { LoginForm as Login } from './index'
import { store } from '@redux/store'

const setup = () => {
  const LoginForm = render(
    <Provider store={store}>
      <MockedProvider>
        <Login />
      </MockedProvider>
    </Provider>,
  )
  return LoginForm
}

test(`Email field test`, () => {
  const registerForm = setup()
  const input = registerForm.getByTestId(`email`)
  expect(input).toHaveValue(``)
  fireEvent.change(input, {
    target: { value: `test@gmail.com` },
  })
  expect(input).toHaveValue(`test@gmail.com`)
})

test(`Password field test`, () => {
  const registerForm = setup()
  const input = registerForm.getByTestId(`password`)
  expect(input).toHaveValue(``)
  fireEvent.change(input, {
    target: { value: `1212121` },
  })
  expect(input).toHaveValue(`1212121`)
})
