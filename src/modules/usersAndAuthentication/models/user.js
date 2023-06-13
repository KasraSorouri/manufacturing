const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstName: {
    type: DataTypes.TEXT,
  },
  lastName: {
    type: DataTypes.TEXT
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  dateCreated: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User