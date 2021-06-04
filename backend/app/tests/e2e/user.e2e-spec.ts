import { TestServer } from '../utils'
import { loginUser, updateUserInfo, deleteUser } from '../entities'
import { updateUserInfoTestUser, invalidTestUser } from '../fixtures'
import { setupTestServer } from '../utils/globalSetup'
import { createNewUserApolloClient } from '../entities/auth'

describe(`User Suite`, () => {
  let testServer: TestServer

  beforeAll(async () => {
    jest.setTimeout(60000)
    testServer = await setupTestServer()
  })

  it(`User should update First Name and return updated user.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    const result = await updateUserInfo(apolloClient, {
      firstName: updateUserInfoTestUser.firstName,
      lastName: testUser.lastName,
      oldPassword: testUser.password,
      updatePassword: testUser.password
    })
    expect(result.data.updateUserInfo.user.firstName).not.toBe(
      testUser.firstName
    )
    expect(result.data.updateUserInfo.user.firstName).toBe(
      updateUserInfoTestUser.firstName
    )
    expect(result.data.updateUserInfo.user.lastName).toBe(testUser.lastName)
    expect(result.data.updateUserInfo.user.email).toEqual(testUser.email)
    await deleteUser(testServer.connection, testUser)
  })

  it(`User should update user Last name and return updated user.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    const result = await updateUserInfo(apolloClient, {
      firstName: testUser.firstName,
      lastName: updateUserInfoTestUser.lastName,
      oldPassword: testUser.password,
      updatePassword: testUser.password
    })
    expect(result.data.updateUserInfo.user.firstName).toEqual(
      testUser.firstName
    )
    expect(result.data.updateUserInfo.user.lastName).toEqual(
      updateUserInfoTestUser.lastName
    )
    expect(result.data.updateUserInfo.user.lastName).not.toBe(testUser.lastName)
    expect(result.data.updateUserInfo.user.email).toEqual(testUser.email)
    await deleteUser(testServer.connection, testUser)
  })

  it(`User should update user Password and return updated user.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    const result = await updateUserInfo(apolloClient, {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      oldPassword: testUser.password,
      updatePassword: updateUserInfoTestUser.updatePassword
    })

    expect(result.data.updateUserInfo.user.firstName).toEqual(
      testUser.firstName
    )
    expect(result.data.updateUserInfo.user.lastName).toBe(testUser.lastName)
    expect(result.data.updateUserInfo.user.email).toEqual(testUser.email)

    const loginResponse = await loginUser(apolloClient, {
      email: testUser.email,
      password: updateUserInfoTestUser.updatePassword
    })

    expect(loginResponse.data).not.toBe(null)
    await deleteUser(testServer.connection, testUser)
  })

  it(`should throw error if no data is updated.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    let graphQlErr: string
    try {
      await updateUserInfo(apolloClient, {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        oldPassword: testUser.password, // sending wrong password
        updatePassword: testUser.password
      })
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toBe(`No information updated!`)
    await deleteUser(testServer.connection, testUser)
  })

  it(`should throw error if first name is more than 30 characters.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    let graphQlErr: string
    try {
      await updateUserInfo(apolloClient, {
        firstName: invalidTestUser.firstNameMax,
        lastName: testUser.lastName,
        oldPassword: testUser.password,
        updatePassword: testUser.password
      })
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toBe(`First name should be less than 30`)
    await deleteUser(testServer.connection, testUser)
  })

  it(`should throw error if last name is more than 30 characters.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    let graphQlErr: string
    try {
      await updateUserInfo(apolloClient, {
        firstName: testUser.firstName,
        lastName: invalidTestUser.lastNameMax,
        oldPassword: testUser.password,
        updatePassword: testUser.password
      })
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toBe(`Last name should be less than 30`)
    await deleteUser(testServer.connection, testUser)
  })

  it(`should throw error if new password is less than 7 characters.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    let graphQlErr: string
    try {
      await updateUserInfo(apolloClient, {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        oldPassword: testUser.password,
        updatePassword: invalidTestUser.wrongLessThanCharsLengthPassword
      })
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toBe(`Password length must be 7 or greater`)
    await deleteUser(testServer.connection, testUser)
  })

  it(`should throw error if old password is incorrect.`, async () => {
    const { testUser, apolloClient } = await createNewUserApolloClient(
      testServer.apolloClient
    )
    let graphQlErr: string
    try {
      await updateUserInfo(apolloClient, {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        oldPassword: testUser.password + `random`, // Sending wrong password
        updatePassword: invalidTestUser.updatePassword
      })
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toBe(`The old password you have entered is incorrect!`)
    await deleteUser(testServer.connection, testUser)
  })
})
