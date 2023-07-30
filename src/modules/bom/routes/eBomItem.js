const router = require('express').Router()

const eBomItem = require('../controllers/eBomItem')
const { tokenExtractor, rightAuthority } = require('../../usersAndAuthentication/utils/midwares')

// Get TechnicalItem
router.get('/', eBomItem.getAllEBomItem)
router.get('/:id', eBomItem.getEBomItem)

// Create TechnicalItem
router.post('/', tokenExtractor, rightAuthority(['BOM_ADD']), eBomItem.addEBomItem)

// Edit TechnicalItem
//router.put('/:id', tokenExtractor, rightAuthority(['BOM_ADD']), eBomController.editEBom)

module.exports = router