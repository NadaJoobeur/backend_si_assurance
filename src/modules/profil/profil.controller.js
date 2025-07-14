import profilService from './profil.service.js'
import { upsertProfil as upsertProfilService, getProfilByUserId as getProfilByUserIdService } from './profil.service.js'

const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await profilService.getUserById(id)

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

export default {
  getUserById,
}


export const upsertProfil = async (req, res) => {
  try {
    const { userId, phoneNumber, department, employeeId, poste } = req.body
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined

    const profil = await upsertProfilService(userId, phoneNumber, department, employeeId, profileImage,poste)
    res.json(profil)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getProfilByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const profil = await getProfilByUserIdService(userId)
    res.json(profil)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}