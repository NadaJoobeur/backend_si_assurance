import profilModel from './profil.model.js'
import profile from './profile.model.js'


const getUserById = async (id) => {
  return profilModel.findUserById(id)
}

export default {
  getUserById,
}



// Créer ou mettre à jour le Profil
export const upsertProfil = async (userId, phoneNumber, department, employeeId, profileImage,poste) => {
  let profil = await profile.findOne({ where: { userId } })

  if (profil) {
    profil.phoneNumber = phoneNumber
    profil.department = department
    profil.employeeId = employeeId
    profil.poste = poste
    if (profileImage) profil.profileImage = profileImage
    await profil.save()
  } else {
    profil = await profile.create({
      userId,
      phoneNumber,
      department,
      employeeId,
      profileImage,
      poste
    })
  }

  return profil
}

// Récupérer Profil par userId
export const getProfilByUserId = async (userId) => {
  return await profile.findOne({ where: { userId } })
}
