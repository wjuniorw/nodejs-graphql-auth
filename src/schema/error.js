import { gql } from 'apollo-server-express'

export default gql`
  type Error {
    ok: Boolean
    path: String
    message: String
  }
`
