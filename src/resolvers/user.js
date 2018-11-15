
export default {
  Query: {
    user: (parent, args, context) => ({name: 'teste', email: 'test@mail.com'}),
    users: (parent, args, context) => ([{name: 'teste', email: 'test@mail.com'}]),
  },
  Mutation: {
    //
  }
}
