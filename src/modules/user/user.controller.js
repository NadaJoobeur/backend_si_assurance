import { createUser, loginUser } from './user.service.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    console.log('Register payload:', req.body)
    const user = await createUser(req.body)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    res.status(201).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body)
    res.json({ user, token })
  } catch (error) {
    next(error)
  }
}
