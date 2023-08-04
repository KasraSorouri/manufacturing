const router = require('express').Router()

const techItem = require('../controllers/techItem')
const { tokenExtractor, rightAuthority } = require('../../usersAndAuthentication/utils/midwares')

// Get TechnicalItem
router.get('/', techItem.getAllTechItems)
router.get('/:id', techItem.getTechItem)

// Create TechnicalItem
router.post('/', tokenExtractor, rightAuthority(['T_ITEM_ADD']), techItem.addTechItem)

// Edit TechnicalItem
//router.put('/:id', tokenExtractor, rightAuthority(['BOM_ADD']), eBomController.editEBom)

module.exports = router