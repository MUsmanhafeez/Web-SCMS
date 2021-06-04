// Extract env variables
const { NODE_ENV } = process.env

// Node environment Variables
export const IS_PROD = NODE_ENV === `production`
export const IS_TEST = NODE_ENV === `test`
export const IS_DEV = NODE_ENV === `development`

export const ASP_PRODUCT_NAME = `Amoxt Solutions Platform`
