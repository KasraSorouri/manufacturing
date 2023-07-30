const { EBom } = require('../models')
const { User } = require('../../usersAndAuthentication/models')
const { eBomProcessor } = require('../utils/eBomProcessor')

const getAllEBoms = async() => {
  const eBoms = await EBom.findAll({
    include: {
      model: User,
      attributes: ['username', 'firstName', 'lastName'],
    }
  })
  return eBoms
}

const getEBom = async(id) => {
  const eBom = await EBom.findByPk(id, {
    include: {
      model: User,
      attributes: ['username', 'firstName', 'lastName'],
    }
  })
  return eBom
}

const createEBom = async ({ eBomData, user }) => {
  const newEBomData = await eBomProcessor({ eBomData, user })
  try {
    const eBom = await EBom.create(newEBomData)
    return eBom
  } catch(err) {
    console.log('Ebom * Services * add * Error ->',err)
    throw new Error(err.original.detail)
  }
}

module.exports = {
  getAllEBoms,
  getEBom,
  createEBom,

}