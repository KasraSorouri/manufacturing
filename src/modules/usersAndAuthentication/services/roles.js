const { Role, User, Right } = require('../models')

const getAllRoles = async() => {
  const roles = await Role.findAll({
    include: {
      model: User,
      attributes: ['id','username','firstName','lastName','active'],
      through: {
        attributes: []
      }
    }
  })
  return roles
}

const getRole = async(id) => {
  const role = await Role.findByPk(id, {
    include: {
      model: User,
      attributes: ['id','username','firstName','lastName','active'],
      through: {
        attributes: []
      }
    }
  })
  return role
}

const createRole = async(roleData) => {

  try {
    const role = await Role.create(roleData)
    return role
  } catch(err) {
    throw new Error(err.message)
  }
}

const updateRoleRights = async ({ id, rights }) => {

  const okRights = await Right.findAll({ where: { id: [...rights] } })
  if (okRights.length === 0) {
    throw new Error('no right found')
  }
  try {
    const role = await Role.findByPk(id)
    await role.setRights([])
    await role.addRights(okRights)
    const result = await Role.findByPk(id,{
      include: {
        model: Right,
        attributes: ['right', 'relatedModule'],
        through: {
          attributes: []
        }
      }
    })
    return result
  } catch(err) {
    throw new Error('Something wrong happend, Check role\'s rights again')
  }
}

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRoleRights
}