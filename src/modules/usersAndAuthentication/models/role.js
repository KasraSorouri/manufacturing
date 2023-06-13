const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'role'
})

module.exports = Role