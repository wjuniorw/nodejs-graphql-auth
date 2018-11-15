import { mergeTypes } from 'merge-graphql-schemas'

import user from './user'

const types = mergeTypes([ user, ])

export default types
