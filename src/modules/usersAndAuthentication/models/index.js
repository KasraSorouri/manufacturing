const User = require('./user')
const Role = require('./role')
const Right = require('./right')
const UserRoles = require('./userRoles')
const RoleRights = require('./roleRights')

Role.belongsToMany(User, { through: UserRoles })
User.belongsToMany(Role, { through: UserRoles })

Right.belongsToMany(Role, { through: RoleRights })
Role.belongsToMany(Right, { through: RoleRights })

module.exports = {
  User,
  Role,
  Right,
  UserRoles
}