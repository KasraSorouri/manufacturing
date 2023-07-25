const router = require('express').Router()

const eBomController = require('../controllers/eBom')
const { tokenExtractor, rightAuthority } = require('../../usersAndAuthentication/utils/midwares')

// Get EBOM
router.get('/', eBomController.getAllEBoms)
router.get('/:id', eBomController.getEBom)

// Create EBOM
router.post('/', tokenExtractor, rightAuthority(['BOM_ADD']), eBomController.addEBom)

// Edit EBOM
//router.put('/:id', tokenExtractor, rightAuthority(['BOM_ADD']), eBomController.editEBom)

module.exports = router