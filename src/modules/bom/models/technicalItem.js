const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class TechnicalItem extends Model {}

TechnicalItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  technicalName: {
    type: DataTypes.TEXT,
  },
  technicalCode: {
    type: DataTypes.TEXT
  },
  technicalCategory: {
    type: DataTypes.TEXT
  },
  unit: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'No'
  },
  spesification: {
    type: DataTypes.JSON
  },
  alternativeCode: {
    type: DataTypes.TEXT
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'technicalItem'
})

module.exports = TechnicalItem