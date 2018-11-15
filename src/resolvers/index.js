import { mergeResolvers } from 'merge-graphql-schemas'

import user from './user'

const resolvers = mergeResolvers([user])

export default resolvers
