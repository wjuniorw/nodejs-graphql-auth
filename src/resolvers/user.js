
import { baseResolver } from './baseResolver'
import { tryLogin, createUser } from '../auth'
import { isAdminResolver, isAuthenticatedResolver } from './authResolver'

export default {
  Query: {
    user: isAdminResolver.createResolver(async(parent, args, { db: { User }}) => {
      return await User.findOne(args)
    }),
    users: isAuthenticatedResolver.createResolver(async(parent, args, { db: { User }}) => {
      return await User.find(args)
    }),
    // user: async(parent, args, { db: { User } }) => await User.findOne(args),
    // users: async(parent, args, { db: { User } }) => await User.find(args),
  },
  Mutation: {
    login: async(parent, { email, password }, { db: { User }, SECRET }) =>
      await tryLogin(email, password, User, SECRET),

    register: async(parent, { name, email, password, admin }, { db: { User } }) =>
      await createUser(name, email, password, admin, User),
  }
}
