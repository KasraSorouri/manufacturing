const EBom = require('./eBom')
const EBomItem = require('./eBomItem')
const TechnicalItem =require('./technicalItem')

const User = require('../../usersAndAuthentication/models/user')

EBom.hasMany(EBomItem)
EBomItem.belongsTo(EBom)

EBomItem.hasMany(TechnicalItem)

EBom.belongsTo(User, { foreignKey: 'userCreated' })

EBom.belongsTo(EBom, { as: 'Parent', foreignKey: 'masterId' })
EBom.hasMany(EBom, { as: 'Children', foreignKey: 'masterId' })

module.exports = {
  EBom,
  EBomItem,
  TechnicalItem,
}