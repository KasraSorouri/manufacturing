const { EBomItem, EBom, TechnicalItem } = require('../models')
const { eBomItemProcessor } = require('../utils/eBomItemProcessor')

const getAllEBomItem = async() => {
  const eBomItems = await EBomItem.findAll({
    include:[
      {
        model: EBom,
        attributes: ['bomName', 'bomCode']
      },
      {
        model: TechnicalItem,
        attributes: [ 'technicalName' ,'technicalCode']
      }
    ]
  })
  return eBomItems
}

const getEBomItem= async(id) => {
  const eBomItem = await EBomItem.findByPk(id)
  return eBomItem
}

const createEBomItem = async ({ eBomItemData }) => {
  const newEBomItem = await eBomItemProcessor({ eBomItemData })
  console.log('EBOM Item Services * createEBomItem * newEBomItem ->',newEBomItem)
  try {
    const eBomItem = await EBomItem.create(newEBomItem)
    console.log('EBOM Item Services * createEBomItem * newEBomItem ->',newEBomItem)

    return eBomItem
  } catch(err) {
    console.log('EBOM Item Services * createEBomItem * error ->',err)

    throw new Error(err.original.detail)
  }
}

module.exports = {
  getAllEBomItem,
  getEBomItem,
  createEBomItem,
}