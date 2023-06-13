const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class RoleRights extends Model {}

RoleRights.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'roles', key: 'id' }
  },
  rightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'rights', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'roleRights'
})

module.exports = RoleRights