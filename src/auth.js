import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'

export const tryLogin = async(email, password, User, SECRET) => {
  const user = await User.findOne({ email })

  if (!user) {
    // console.log('user not found............', user)
    return {
      ok: false,
      errors: [{ path: 'email', message: 'nenhuma conta cadastrada neste Email!'}]
    }
  }

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) {
    return {
      ok: false,
      errors: [{path: 'password', message: 'Combinacao de email e password invalida'}]
    }
  }

  const token = await createToken(user, SECRET)

  return {
    ok: true,
    user,
    token,
  }
}

// register user...
export const createUser = async(name, email, password, admin, User) => {

  const user = await User.findOne({ email })
  if (user) {
    return {
      ok: false,
      errors: [ { path: 'email', message: 'Email ja cadastrado! '}]
    }
  }
  if (password.length < 8) {
    return {
      ok: false,
      errors: [ { path: 'password', message: 'Senha muito curta! ' } ]
    }
  }

    const passHash = await bcrypt.hashSync(password)
    const args = { name, email, password: passHash, admin }
    const newUser = new User(args)
    const resp = await newUser.save()
    // console.log('resultado register....', resp)

    return {
      ok: true,
      user: resp
    }
}

export const createToken = async({ _id, admin = false }, secret) => {
  console.log('token...admin? ', admin)
  const token = await jwt.sign(
    {
      user: { _id, admin },
    },
    secret,
    {
      expiresIn: '1d'
    }
  )
  return token
}
