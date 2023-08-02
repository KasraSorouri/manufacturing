const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class EBomItem extends Model {}

EBomItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty: {
    type: DataTypes.NUMBER,
  },
  unit: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'No'
  },
  qtyChangable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  spesification: {
    type: DataTypes.JSON
  },
  subModule: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  relationType: {
    type: DataTypes.ENUM('link','copy'),
    allowNull: function () {
      return this.subModule === false
    },
  },
  relatedTo: {
    type: DataTypes.INTEGER,
    allowNull: function () {
      return this.subModule === false
    }
  },
  note : {
    type: DataTypes.JSON
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'ebomItem'
})

module.exports = EBomItem