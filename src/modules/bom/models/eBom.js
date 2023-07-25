const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../../../configs/db')

class EBom extends Model {}

EBom.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bomName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  revision: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bomCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  bomType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userCreated: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  master: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  productName: {
    type: DataTypes.TEXT,
  },
  drawingNo: {
    type: DataTypes.TEXT,
  },
  drawingPage: {
    type: DataTypes.TEXT
  },
  orderCode: {
    type: DataTypes.TEXT
  },
  orderSubCode: {
    type: DataTypes.TEXT
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'ebom'
})

module.exports = EBom