const EBom = require('./eBom')
const EBomItem = require('./eBomItem')
const TechnicalItem =require('./technicalItem')

const User = require('../../usersAndAuthentication/models/user')

EBom.hasMany(EBomItem)
EBomItem.belongsTo(EBom)

EBom.belongsTo(User, { foreignKey: 'userCreated' })

EBom.belongsTo(EBom, { as: 'Parent', foreignKey: 'masterId' })
EBom.hasMany(EBom, { as: 'Children', foreignKey: 'masterId' })

EBomItem.belongsTo(TechnicalItem, { foreignKey: 'item' })

module.exports = {
  EBom,
  EBomItem,
  TechnicalItem,
}