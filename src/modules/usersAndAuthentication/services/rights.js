const { Right, Role } = require('../models')

const getAllRights = async() => {
  const rights = await Right.findAll({
    include: {
      model: Role,
      attributes: ['id','roleName'],
      through: {
        attributes: []
      }
    }
  })
  return rights
}

const getRight = async(id) => {
  const right = await Right.findByPk(id, {
    include: {
      model: Role,
      attributes: ['id','roleName'],
      through: {
        attributes: []
      }
    }
  })
  return right
}

const createRight= async(rightData) => {
  try {
    const right = await Right.create(rightData)
    return right
  } catch(err) {
    throw new Error(err.message)
  }
}


module.exports = {
  getAllRights,
  getRight,
  createRight
}