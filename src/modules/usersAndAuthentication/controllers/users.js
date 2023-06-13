const userServices = require('../services/users')

const getAllUsers = async (req, res) => {
  try{
    const users = await userServices.getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'No user found'})
  }
}

const getUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await userServices.getUser(id)
    res.json(user)
  } catch (err) {
    res.status(404).json({ error: 'User not found'})
  }
}


const addUser = async (req, res) => {
  const id = req.params.id
  const userData = req.body
  try {
    const newUser = await userServices.createUser(id,userData)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

const editUser = async (req, res) => {
  const id = Number(req.params.id)
  if (!(id === req.decodedToken.id || req.authorized)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const newData = req.body
  try {
    const newUser = await userServices.updateUser(id,newData)
    res.json(newUser)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

const assignRoles = async (req, res) => {
  const id = req.params.id
  const roles = req.body
  try {
    const resulat = await userServices.updateUserRoles(id,roles)
    res.json(resulat)
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign roles' });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  editUser,
  assignRoles
}