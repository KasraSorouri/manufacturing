const rightServices = require('../services/rights')

const getAllRights = async (req, res) => {
  try{
    const rights = await rightServices.getAllRights()
    res.json(rights)
  } catch (err) {
    res.status(500).json({ error: 'No right found' })
  }
}

const getRight = async (req, res) => {
  const id = req.params.id
  try {
    const right = await rightServices.getRight(id)
    res.json(right)
  } catch (err) {
    res.status(404).json({ error: 'Right not found' })
  }
}

const addRight = async (req, res) => {
  const rightData = req.body
  try {
    const newRight = await rightServices.createRight(rightData)
    res.status(201).json(newRight)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create right' })
  }
}

module.exports = {
  getAllRights,
  getRight,
  addRight
}