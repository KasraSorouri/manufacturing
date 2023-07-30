const eBomItemService = require('../services/eBomItem')

const getAllEBomItem = async (req, res) => {
  try{
    const eBomItems = await eBomItemService.getAllEBomItem()
    res.json(eBomItems)
  } catch (err) {
    res.status(500).json({ error: 'No Item found' })
  }
}

const getEBomItem = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const eBomItem = await eBomItemService.getEBomItem(id)
    res.json(eBomItem)
  } catch (err) {
    res.status(404).json({ error: 'Item not found' })
  }
}


const addEBomItem = async (req, res) => {
  const eBomItemData = req.body
  try {
    const newEBomItem = await eBomItemService.createEBomItem({ eBomItemData })
    res.status(201).json(newEBomItem)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

module.exports = {
  getAllEBomItem,
  getEBomItem,
  addEBomItem,
}