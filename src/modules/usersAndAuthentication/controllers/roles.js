const roleServices = require('../services/roles')

const getAllRoles = async (req, res) => {
  try{
    const roles = await roleServices.getAllRoles()
    res.json(roles)
  } catch (err) {
    res.status(500).json({ error: 'No role found' })
  }
}

const getRole = async (req, res) => {
  const id = req.params.id
  try {
    const role = await roleServices.getRole(id)
    res.json(role)
  } catch (err) {
    res.status(404).json({ error: 'Role not found' })
  }
}

const addRole = async (req, res) => {
  const roleData = req.body
  try {
    const newRole = await roleServices.createRole(roleData)
    res.status(201).json(newRole)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create role' })
  }
}

const assignRights = async (req, res) => {
  const id = req.params.id
  const rights = req.body
  try {
    const resulat = await roleServices.updateRoleRights(id,rights)
    res.json(resulat)
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign rights' })
  }
}

module.exports = {
  getAllRoles,
  getRole,
  addRole,
  assignRights
}