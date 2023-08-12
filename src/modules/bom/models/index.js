const EBom = require('./eBom')
const EBomItem = require('./eBomItem')
const TechItem =require('./techItem')
const TechItemSubordinations = require('./techItemSubordination')

const User = require('../../usersAndAuthentication/models/user')

EBom.hasMany(EBomItem)
EBomItem.belongsTo(EBom)

EBom.belongsTo(User, { foreignKey: 'userCreated' })

EBom.belongsTo(EBom, { as: 'Parent', foreignKey: 'masterId' })
EBom.hasMany(EBom, { as: 'Children', foreignKey: 'masterId' })

EBomItem.belongsTo(TechItem, { foreignKey: 'item' })

TechItem.belongsTo(EBom, { foreignKey: 'relatedBom' })


TechItem.belongsToMany(TechItem, {
  through: 'techItemSubordinations',
  foreignKey: 'masterId',
  otherKey: 'subordinateId',
  as: 'subordinateItems'
})

TechItem.belongsToMany(TechItem, {
  through: 'techItemSubordinations',
  foreignKey: 'subordinateId',
  otherKey: 'masterId',
  as: 'masterItems'
})

module.exports = {
  EBom,
  EBomItem,
  TechItem,
  TechItemSubordinations
}