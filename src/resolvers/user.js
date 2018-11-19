
import { tryLogin, createUser } from '../auth'

export default {
  Query: {
    user: async(parent, args, { db: { User }}) => {
      // console.log('query user....', args)
      const user = await User.findOne(args)
      // console.log('result query user....', user)
      return user
    },
    users: async(parent, args, { db: { User } }) => await User.find(args),
  },
  Mutation: {
    login: async(parent, { email, password }, { db: { User }, SECRET }) =>
      await tryLogin(email, password, User, SECRET),

    register: async(parent, { name, email, password, admin }, { db: { User } }) =>
      await createUser(name, email, password, admin, User),
  }
}
