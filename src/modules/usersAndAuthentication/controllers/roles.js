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

const editRole = async (req, res) => {
  const id = Number(req.params.id)
  const roleData = req.body

  try {
    const newRole = await roleServices.updateRole({ id, roleData })
    res.status(200).json(newRole.dataValues)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role', message: err.message })
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
  editRole,
  assignRights
}