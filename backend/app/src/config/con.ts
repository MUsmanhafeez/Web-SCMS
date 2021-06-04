// APP Variables
export const ASP_BACKEND_APP_PORT = process.env.ASP_BACKEND_APP_PORT || 80
export const ASP_BACKEND_APP_URI =
  process.env.ASP_BACKEND_APP_URI || `https://localhost:${ASP_BACKEND_APP_PORT}`

export const ASP_FRONTEND_APP_URI = process.env.ASP_FRONTEND_APP_URI
export const ASP_REDIS_HOST = process.env.ASP_REDIS_HOST

export const ASP_REDIS_PORT = process.env.ASP_REDIS_PORT
  ? parseInt(process.env.ASP_REDIS_PORT)
  : 6379
