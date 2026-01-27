import { gql } from '@apollo/client'

const CREATE_OAUTH_IDENTITY = gql`
  mutation CreateOAuthIdentity(
    $provider: String!
    $sessionState: String!
    $code: String!
  ) {
    createOAuthIdentity(
      provider: $provider
      sessionState: $sessionState
      code: $code
    ) {
      id
      provider
    }
  }
`

export { CREATE_OAUTH_IDENTITY }
