// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorisé. Token manquant.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // Tu peux accéder à req.user.id dans les routes
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' })
  }
}

