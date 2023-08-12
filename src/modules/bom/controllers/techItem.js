const techItemServices = require('../services/techItem')

const getAllTechItems = async (req, res) => {

  // Extract the filter parameters
  const encodedData = req.query.data
  const decodedData = decodeURIComponent(encodedData)
  const parsedObject = JSON.parse(decodedData)
  const filterParams = parsedObject

  // Get All tecnical Items based on Filter Params
  try{
    const techItems = await techItemServices.getAllTechItems(filterParams)
    res.json(techItems)
  } catch (err) {
    res.status(500).json({ error: 'No Item found' })
  }
}

// Get One technical Item based on Id
const getTechItem = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const techItem = await techItemServices.getTechItem(id)
    res.json(techItem)
  } catch (err) {
    res.status(404).json({ error: 'Item not found' })
  }
}

// Create a new Tchnical Item
const addTechItem = async (req, res) => {
  const techItemData = req.body
  try {
    const newTechItem = await techItemServices.createTechItem({ techItemData })
    res.status(201).json(newTechItem)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

// Edit a Technical Item
const editTechItem = async (req, res) => {
  const id = Number(req.params.id)
  const techItemData = req.body

  try {
    const updatedTechItem = await techItemServices.updateTechItem({ id, techItemData })
    res.status(200).json(updatedTechItem.dataValue)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

module.exports = {
  getAllTechItems,
  getTechItem,
  addTechItem,
  editTechItem
}