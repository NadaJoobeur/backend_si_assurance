// user.controller.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './user.model.js'  // bien mettre l'extension `.js`


export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  return user
}

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new Error('Utilisateur non trouvé')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Mot de passe incorrect')

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7jours' })

  return { user, token }
}


