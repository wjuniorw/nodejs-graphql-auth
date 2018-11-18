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

  return {
    ok: true,
    user,
    // token: '',
  }
}

// register user...
export const createUser = async(name, email, password, User, ) => {

    const passHash = await bcrypt.hashSync(password)
    const args = { name, email, password: passHash }
    const newUser = new User(args)
    const resp = await newUser.save()
    console.log('resultado register....', resp)

    return {
      ok: true,
      user: resp
    }

}
