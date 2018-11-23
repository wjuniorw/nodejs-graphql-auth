// import { createError } from 'apollo-errors'

import { baseResolver } from './baseResolver'

// const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
//   message: 'You must be logged in to do this'
// })

export const isAuthenticatedResolver = baseResolver.createResolver(

  (root, args, { user }, info) => {
    if (!user) {
      return [{
        ok: false,
        error: { message: 'Sessao expirou!, faca login'}
      }]
    }
    // if (!user) throw new AuthenticationRequiredError()
  }
)

export const isAdminResolver = isAuthenticatedResolver.createResolver(

  (root, args, { user }, info) => {

    if (!user.admin) {
      return {
        ok: false,
        error: { message: 'vc nao tem acesso aqui! ;-)' }
      }
    }
  }
)
