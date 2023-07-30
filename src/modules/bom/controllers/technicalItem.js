const technicalItem = require('../services/technicalItem')

const getAllTechnicalItems = async (req, res) => {
  try{
    const techItems = await technicalItem.getAllTechnicalItems()
    res.json(techItems)
  } catch (err) {
    res.status(500).json({ error: 'No Item found' })
  }
}

const getTechnicalItem = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const techItem = await technicalItem.getTechnicalItem(id)
    res.json(techItem)
  } catch (err) {
    res.status(404).json({ error: 'Item not found' })
  }
}


const addTechnicalItem = async (req, res) => {
  const technicalItemData = req.body
  try {
    const newTechnicalItem = await technicalItem.createTechnicalItem({ technicalItemData })
    res.status(201).json(newTechnicalItem)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

module.exports = {
  getAllTechnicalItems,
  getTechnicalItem,
  addTechnicalItem,
}