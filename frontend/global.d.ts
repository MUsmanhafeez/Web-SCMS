declare namespace Process {
  interface ProcessEnv {
    NEXT_PUBLIC_ASP_FRONTEND_URL: string
    NEXT_PUBLIC_ASP_BACKEND_APP_URI: string
    NEXT_PUBLIC_OIDC_CLIENT_ID: string
  }
}

declare namespace jest {
  interface Options {
    media?: string
    modifier?: string
    supports?: string
  }

  interface Matchers<R> {
    toHaveStyleRule(property: string, value?: Value, options?: Options): R
  }
}
