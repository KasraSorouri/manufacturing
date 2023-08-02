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
    allowNull: false,
    unique: true,
  },
  technicalCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  specifications: {
    type: DataTypes.JSON
  },
  unit: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'No'
  },
  alternativeUnit: {
    type: DataTypes.TEXT,
  },
  subordinate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  subordinateTo: {
    type: DataTypes.INTEGER,
  },
  itemType: {
    type: DataTypes.ENUM('SUPPLY','MAKE')
  },
  relatedBom: {
    type: DataTypes.INTEGER,
    allowNull: function () {
      return this.itemType !== 'MAKE'
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'technicalItem'
})

module.exports = TechnicalItem