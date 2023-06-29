const { User, Role, Right } = require('../models')
const { userProcessor } = require('../utils/userProcessor')

const getAllUsers = async() => {
  const users = await User.findAll({
    attributes : { exclude: ['password', 'userRoles'] },
    include: {
      model: Role,
      //attributes: ['roleName'],
      through: {
        attributes: []
      }
    }
  })
  return users
}

const getUser = async(id) => {
  const user = await User.findByPk(id, {
    attributes : { exclude: ['password', 'userRoles'] },
    include: {
      model: Role,
      attributes: ['roleName'],
      through: {
        attributes: []
      },
      include: {
        model: Right,
        attributes: ['right'],
        through: {
          attributes: []
        },
      }
    }
  })
  return user
}

const createUser = async (userData) => {
  const newUser = await userProcessor(userData)
  try {
    const user = await User.create(newUser)
    if (userData.roles.length > 0) {
      updateUserRoles({ id : user.id, roles: userData.roles })
    }
    return user
  } catch(err) {
    throw new Error(err.message)
  }
}

const updateUser = async ({ id, userData }) => {
  const newData = await userProcessor(userData)

  try {
    const user = await User.findByPk(id)
    user.update(newData)
    if (userData.roles.length > 0) {
      updateUserRoles({ id : user.id, roles: userData.roles })
    }
    return user
  } catch(err) {
    throw new Error(err.message)
  }
}

const updateUserRoles = async ({ id, roles }) => {

  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('user not found')
  }
  await user.setRoles([])
  const okRoles = await Role.findAll({ where: { id: [...roles], active: true } })
  if (okRoles.length === 0) {
    throw new Error('no Active role found')
  }
  try {
    await user.addRoles(okRoles)
    const result = await User.findByPk(id,{
      attributes : { exclude: ['password', 'userRoles'] },
      include: {
        model: Role,
        attributes: ['roleName'],
        through: {
          attributes: []
        },
        include: {
          model: Right,
          attributes: ['right'],
          through: {
            attributes: []
          },
        }
      }
    })
    return result
  } catch (err) {
    throw new Error('Something wrong happend, Check user\'s roles again')
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserRoles
}