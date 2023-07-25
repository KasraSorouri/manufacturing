const eBomServices = require('../services/eBom')

const getAllEBoms = async (req, res) => {
  try{
    const eBoms = await eBomServices.getAllEBoms()
    res.json(eBoms)
  } catch (err) {
    res.status(500).json({ error: 'No EBOM found' })
  }
}

const getEBom = async (req, res) => {
  const id = req.params.id
  try {
    const eBom = await eBomServices.getEBom(id)
    res.json(eBom)
  } catch (err) {
    res.status(404).json({ error: 'EBOM not found' })
  }
}


const addEBom = async (req, res) => {
  const eBomData = req.body
  const user = req.decodedToken.id  // Get User from Token
  try {
    const newEBom = await eBomServices.createEBom({ eBomData, user })
    res.status(201).json(newEBom)
  } catch (err) {
    res.status(409).json({ error: `${err}` })
  }
}

module.exports = {
  getAllEBoms,
  getEBom,
  addEBom,
}