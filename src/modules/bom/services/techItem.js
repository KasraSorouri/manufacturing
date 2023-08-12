const { Op } = require('sequelize')
const { TechItem } = require('../models')
const { techItemProcessor } = require('../utils/techItemProcessor')

const getAllTechItems = async(filterParams) => {
  const techItems = await TechItem.findAll({
    where: {
      technicalName : {
        [Op.iLike]: `%${filterParams.technicalName || ''}%`
      }
    },
    include: {
      model: TechItem,
      as: 'masterItems',
      attributes: ['id','technicalName'],
      through: {
        attributes: []
      },
    },
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
    updateTechItemSubordinations({ id : techItem.id, masterItems: techItemData.masterItems })

    return techItem
  } catch(err) {
    throw new Error(err)
  }
}

const updateTechItem = async ({ id, techItemData }) => {

  console.log(' techItem * Services * edit * techItemData ->',techItemData, '  **  id ->', id)

  const newData = await techItemProcessor({ techItemData })

  try {
    const techItem = await TechItem.findByPk(id)
    //console.log(' techItem * Services * edit * techItem ->',techItem)

    await techItem.update(newData)
    console.log(' techItem * Services * edit * updated techItem ** ->',techItem)

    // Add Master Items for Sobordinates
    updateTechItemSubordinations({ id : techItem.id, masterItems: techItemData.masterItems })

    return techItem
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

const updateTechItemSubordinations = async ({ id, masterItems }) => {

  const techItem = await TechItem.findByPk(id)

  if (!techItem) {
    throw new Error('Item not found')
  }
  await techItem.setMasterItems([])

  if ( masterItems.length > 0 ){
    const okMaterItems = await TechItem.findAll({ where: { id: [...masterItems], active: true } })
    if (okMaterItems.length === 0) {
      throw new Error('no Active Item found')
    }
    try {
      await techItem.addMasterItems(okMaterItems)
    }catch (err) {
      throw new Error('Something wrong happend, Check Technical Item again')
    }
  }
  try{
    const result = await TechItem.findByPk(id,{
      include: {
        model: TechItem,
        as: 'subordinateItems',
        attributes: ['id','technicalName'],
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