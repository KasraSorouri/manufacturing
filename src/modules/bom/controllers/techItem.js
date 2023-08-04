const techItem = require('../services/techItem')

const getAllTechItems = async (req, res) => {
  try{
    const techItems = await techItem.getAllTechItems()
    res.json(techItems)
  } catch (err) {
    res.status(500).json({ error: 'No Item found' })
  }
}

const getTechItem = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const techItem = await techItem.getTechItem(id)
    res.json(techItem)
  } catch (err) {
    res.status(404).json({ error: 'Item not found' })
  }
}


const addTechItem = async (req, res) => {
  const techItemData = req.body
  try {
    const newTechItem = await techItem.createTechItem({ techItemData })
    res.status(201).json(newTechItem)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

module.exports = {
  getAllTechItems,
  getTechItem,
  addTechItem,
}