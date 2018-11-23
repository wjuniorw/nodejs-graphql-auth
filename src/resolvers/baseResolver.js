
import { createResolver } from 'apollo-resolvers'
import { createError, isInstance } from 'apollo-errors'

const UnknownError = createError('UnknownError', {
  message: 'Erro desconhecido!  Tente novamente mais tarde...'
})

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => isInstance(error) ? error : new UnknownError()
)
