const router = require('express').Router()

const { tokenExtractor, roleAuthority } = require('../utils/midwares')

const roleController = require('../controllers/roles')

// get roles
router.get('/', roleController.getAllRoles)
router.get('/:id', roleController.getRole)

// add role
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), roleController.addRole)

// assign rights 
router.post('/:id/rights', tokenExtractor, roleAuthority(['ADMIN']) , roleController.assignRights)

module.exports = router