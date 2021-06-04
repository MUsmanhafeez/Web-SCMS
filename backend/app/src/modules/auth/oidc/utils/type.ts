/* eslint-disable camelcase */
type OidcInteractionKinds = `Interaction`
type OidcInteractionChallengeMethods = `S256`
type OidcInteractionResponseTypes = `code`
export enum OidcInteractionPromptNames {
  LOGIN = `login`,
  CONSENT = `consent`
}

interface OidcInteractionResultLogin {
  accountId: string
}

export interface OidcInteractionResult {
  login: OidcInteractionResultLogin
}

interface OidcInteractionPrompt {
  name: OidcInteractionPromptNames
  reasons: string[]
  details: any
}

interface OidcInteractionParams {
  client_id: string
  code_challenge: string
  code_challenge_method: OidcInteractionChallengeMethods
  redirect_uri: string
  response_type: OidcInteractionResponseTypes
}

export interface OidcInteraction {
  returnTo: string
  prompt: OidcInteractionPrompt
  lastSubmission?: any
  uid: string
  params: OidcInteractionParams
  session?: any
  kind: OidcInteractionKinds
  jti: string
  exp: number
  result?: any
  grantId?: string
  save: (ttl: number) => Promise<void>
}
