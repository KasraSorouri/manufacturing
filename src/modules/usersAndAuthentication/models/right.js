const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class Right extends Model {}

Right.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  right: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  relatedModule: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'right'
})

module.exports = Right