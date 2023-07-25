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
    type: DataTypes.TEXT,
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
    type: DataTypes.INTEGER
  },
  relationType: {
    type: DataTypes.ENUM('link','copy')
  },
  alternativeCode: {
    type: DataTypes.TEXT
  },
  copiedfrom: {
    type: DataTypes.INTEGER
  },
  section: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ebomItem'
})

module.exports = EBomItem