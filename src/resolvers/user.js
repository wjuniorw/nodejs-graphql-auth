
export default {
  Query: {
    user: async(parent, args, { db: { User }}) => await User.find(args),
    users: async(parent, args, { db: { User }}) => await User.find(args),
      // await User.find([{name: 'teste', email: 'test@mail.com'}]),
  },
  Mutation: {
    login: async(parent, args, context)=> ({ ok: true, token: 'hlsfsd454', user: {email: '@'}}),
    register: async(parent, args, context)=> ({ ok: true, token: 'hlsfsd454', user: {email: '@'}})
  }
}
