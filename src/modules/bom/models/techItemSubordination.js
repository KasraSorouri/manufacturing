const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class techItemSubordinations extends Model {}

techItemSubordinations.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  techId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'techItem', key: 'id' }
  },
  subordinateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'techItem', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'techItemSubordinations'
})

module.exports = techItemSubordinations