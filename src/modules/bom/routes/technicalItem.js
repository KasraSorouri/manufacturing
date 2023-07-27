const router = require('express').Router()

const technicalItem = require('../controllers/technicalItem')
const { tokenExtractor, rightAuthority } = require('../../usersAndAuthentication/utils/midwares')

// Get TechnicalItem
router.get('/', technicalItem.getAllTechnicalItems)
router.get('/:id', technicalItem.getTechnicalItem)

// Create TechnicalItem
router.post('/', tokenExtractor, rightAuthority(['T_ITEM_ADD']), technicalItem.addTechnicalItem)

// Edit TechnicalItem
//router.put('/:id', tokenExtractor, rightAuthority(['BOM_ADD']), eBomController.editEBom)

module.exports = router