
export default {
  Query: {
    user: (parent, args, context) => ({name: 'teste', email: 'test@mail.com'}),
    users: (parent, args, context) => ([{name: 'teste', email: 'test@mail.com'}]),
  },
  Mutation: {
    login: async(parent, args, context)=> ({ ok: true, token: 'hlsfsd454', user: {email: '@'}}),
    register: async(parent, args, context)=> ({ ok: true, token: 'hlsfsd454', user: {email: '@'}})
  }
}
