const jwt = require('jsonwebtoken')

const { SECRET } = require('../../../configs/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid!' })
    }
  } else {
    return res.status(401).json({ error: 'token missing!' })
  }
  next()
}

const isAdmin = (req, res, next) => {
  req.isAdmin = req.decodedToken.roles.includes('Admin')
  next()
}

//Authenticated based on Roles
const roleAuthority  = (roles) => {
  return (req, res, next) => {

    // Convert user roles to UpperCase
    const userRoles = req.decodedToken.roles.map(role => role.toUpperCase())

    // Check if any role matches the accepted roles
    const hasRole = roles.some(role => userRoles.includes(role))

    if (!hasRole) {
      return res.status(401).json({ error: 'Operation not allowed for This user' })
    }

    req.permited = true

    next()
  }
}

//Authenticated based on Right
const rightAuthority  = (rights) => {
  return (req, res, next) => {

    // Convert user roles to UpperCase
    const userRights = req.decodedToken.rights.map(right => right.toUpperCase())

    // Check if any role matches the accepted roles
    const hasRight = rights.some(right => userRights.includes(right))

    if (!hasRight) {
      return res.status(401).json({ error: 'Operation not allowed for This user!' })
    }

    req.permited = true

    next()
  }
}

module.exports = {
  tokenExtractor,
  isAdmin,
  roleAuthority,
  rightAuthority
}