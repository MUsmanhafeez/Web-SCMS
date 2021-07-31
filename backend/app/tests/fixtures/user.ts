import { TEST_CONFIG } from '../../src/config/index'
import * as randomstring from 'randomstring'

export interface TestUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const invalidTestUser = {
  firstNameMax: `abcdefghijklmnopqrstuvwxyz0123456789`,
  lastNameMax: `abcdefghijklmnopqrstuvwxyz0123456789`,
  wrongLessThanCharsLengthPassword: `seven1`,
  updatePassword: `update1223`,
  wrongPassword: `555`
}

export const updateUserInfoTestUser = {
  firstName: `updateUserInfo`,
  lastName: `UpdateUser`,
  updatePassword: `updateUserInfo12345`
}

export const randomUser = (): TestUser => {
  const randomFirstName = randomstring.generate({
    length: 6,
    charset: `alphabetic`
  })
  const randomLastName = randomstring.generate({
    length: 8,
    charset: `alphabetic`
  })
  const randomEmailPrefix = randomstring.generate({
    length: 10,
    charset: `alphanumeric`
  })
  const randomPassword = randomstring.generate({
    length: 10,
    charset: `alphanumeric`
  })
  return {
    firstName: randomFirstName,
    lastName: randomLastName,
    email: `${randomEmailPrefix}@${TEST_CONFIG.ALLOWED_TEST_DOMAIN}`,
    password: randomPassword
  }
}
