const { TechItem, TechItemSubordinations } = require('../models')
const { techItemProcessor } = require('../utils/techItemProcessor')

const getAllTechItems = async() => {
  const techItems = await TechItem.findAll({
    model: TechItem,
    as: 'masterItem',
  })
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

const updateTechItem = async ({ id, techItemData }) => {

  console.log(' techItem * Services * edit * techItemData ->',techItemData, '  **  id ->', id)

  const newData = await techItemProcessor({ techItemData })

  try {
    const techItem = await TechItem.findByPk(id)
    console.log(' techItem * Services * edit * techItem ->',techItem)

    await techItem.update(newData)
    console.log(' techItem * Services * edit * updated techItem ** ->',techItem)

    if (techItemData.masterItems.length > 0) {
      updateTechItemSubordinations({ id : techItem.id, masterItems: techItemData.masterItems })
    }
    return techItem
  } catch(err) {
    console.log(' techItem * Services * edit * uerror ** ->',err)

    throw new Error(err.original.detail)
  }
}

const updateTechItemSubordinations = async ({ id, masterItems }) => {

  const techItem = await TechItem.findByPk(id)
  if (!techItem) {
    throw new Error('user not found')
  }
  await techItem.setMasterItems([])
  const okMaterItems = await TechItem.findAll({ where: { id: [...masterItems], active: true } })
  if (okMaterItems.length === 0) {
    throw new Error('no Active role found')
  }
  try {
    await techItem.addRoles(okMaterItems)
    const result = await TechItem.findByPk(id,{
      //attributes : { exclude: [ 'userRoles'] },
      include: {
        model: TechItemSubordinations,
        attributes: ['technicalName'],
        through: {
          attributes: []
        },
      }
    })
    return result
  } catch (err) {
    throw new Error('Something wrong happend, Check Technical Item again')
  }
}

module.exports = {
  getAllTechItems,
  getTechItem,
  createTechItem,
  updateTechItem,
  updateTechItemSubordinations
}