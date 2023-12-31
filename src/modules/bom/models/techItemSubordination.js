const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

const { TechItem } = require('./index')

class TechItemSubordinations extends Model {}

TechItemSubordinations.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  masterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TechItem , key: 'id' }
  },
  subordinateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TechItem , key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'techItemSubordinations'
})

module.exports = TechItemSubordinations