import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
const secret = process.env.SECRET || 'So_Secret!'

export const tryLogin = async(email, password, User, SECRET) => {
  const user = await User.findOne({ email })

  if (!user) {
    // console.log('user not found............', user)
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Nenhuma conta cadastrada com este Email!'}]
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
  // console.log('token...admin? ', admin)
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

export const addUser = async(req, res, next) => {
  const token = req.headers['auth-token']
  // console.log('addUser middleware......', token)

  if (token) {
    try {
      const { user } = jwt.decode(token, secret)
      req.user = user
    }
    catch(e) {
      console.log('erro decode token, or token expired!', e)
      return res.status(401).send({ message: 'Sessao expirou!'})
    }
  }
  next()
}
