const { TechnicalItem } = require('../models')
const { technicalItemProcessor } = require('../utils/technicalItemProcessor')

const getAllTechnicalItems = async() => {
  const technicalItems = await TechnicalItem.findAll({})
  return technicalItems
}

const getTechnicalItem = async(id) => {
  const technicalItem = await TechnicalItem.findByPk(id)
  return technicalItem
}

const createTechnicalItem = async ({ technicalItemData }) => {
  const newTechnicalItem = await technicalItemProcessor({ technicalItemData })
  try {
    const technicalItem = await TechnicalItem.create(newTechnicalItem)
    return technicalItem
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

module.exports = {
  getAllTechnicalItems,
  getTechnicalItem,
  createTechnicalItem,
}