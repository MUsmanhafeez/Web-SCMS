import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import Register from './index'
import { store } from '@redux/store'

const setup = () => {
  const registerForm = render(
    <Provider store={store}>
      <MockedProvider>
        <Register />
      </MockedProvider>
    </Provider>,
  )
  return registerForm
}

test(`First Name field test`, () => {
  const registerForm = setup()
  const input = registerForm.getByTestId(`firstName`)
  expect(input).toHaveValue(``)
  fireEvent.change(input, {
    target: { value: `Test` },
  })
  expect(input).toHaveValue(`Test`)
})

test(`Last Name field test`, () => {
  const registerForm = setup()
  const input = registerForm.getByTestId(`lastName`)
  expect(input).toHaveValue(``)
  fireEvent.change(input, {
    target: { value: `User` },
  })
  expect(input).toHaveValue(`User`)
})

test(`Email field test`, () => {
  const registerForm = setup()
  const input = registerForm.getByTestId(`email`)
  expect(input).toHaveValue(``)
  fireEvent.change(input, {
    target: {
      value: `test@test.amoxt.com`,
    },
  })
  expect(input).toHaveValue(`test@test.amoxt.com`)
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
