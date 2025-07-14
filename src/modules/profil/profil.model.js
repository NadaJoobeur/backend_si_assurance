import  Users from '../user/user.model.js' // remplace par ton import réel de ton modèle Sequelize

const findUserById = async (id) => {
  const user = await Users.findByPk(id, {
    attributes: ['id', 'name', 'email'], // ✅ Ne récupère que ce dont tu as besoin
  })

  return user // Sequelize renvoie `null` si non trouvé
}

export default {
  findUserById,
}
