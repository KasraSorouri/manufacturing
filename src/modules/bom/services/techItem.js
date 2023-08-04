const { TechItem } = require('../models')
const { techItemProcessor } = require('../utils/techItemProcessor')

const getAllTechItems = async() => {
  const techItems = await TechItem.findAll({})
  return techItems
}

const getTechItem = async(id) => {
  const techItem = await TechItem.findByPk(id)
  return techItem
}

const createTechItem = async ({ techItemData }) => {
  const newTechItem = await techItemProcessor({ techItemData })
  try {
    const techItem = await TechItem.create(newTechItem)
    return techItem
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

module.exports = {
  getAllTechItems,
  getTechItem,
  createTechItem,
}