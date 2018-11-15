import { mergeTypes } from 'merge-graphql-schemas'

import user from './user'
import error from './error'

const types = mergeTypes([ user, error ])

export default types
