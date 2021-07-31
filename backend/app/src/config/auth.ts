const USER_PASS_SALT_LENGTH = 32

// Making interface
export interface AUTH_CONFIG_TYPE {
  USER_PASS_SALT_LENGTH: number
}

export const AUTH_CONFIG: AUTH_CONFIG_TYPE = {
  USER_PASS_SALT_LENGTH
}

export default AUTH_CONFIG
