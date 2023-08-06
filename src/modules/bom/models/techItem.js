const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class TechItem extends Model {}

TechItem.init({
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
  supplyType: {
    type: DataTypes.ENUM('BUY','MAKE'),
    defaultValue: 'BUY'
  },
  relatedBom: {
    type: DataTypes.INTEGER,
    allowNull: function () {
      return this.supplyType !== 'MAKE'
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'techItem'
})

module.exports = TechItem