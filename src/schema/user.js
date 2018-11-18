import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
  }
  type Query {
    user(_id:ID): User
    users: [User]
  }
  type Mutation {
    login(email: String, password: String): LoginResponse!
    register(name: String!, email: String!, password: String!): RegisterResponse!
  }
  type LoginResponse {
    ok: Boolean
    user: User
    token: String
    errors: [Error]
  }
  type RegisterResponse {
    ok: Boolean
    user: User
    errors: [Error]
  }
`
