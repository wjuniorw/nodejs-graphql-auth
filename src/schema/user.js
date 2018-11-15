import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    user(id:ID): User
    users: [User]
  }
`
