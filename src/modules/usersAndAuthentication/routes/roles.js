const router = require('express').Router()

const { tokenExtractor, roleAuthority } = require('../utils/midwares')

const roleController = require('../controllers/roles')

// Get Roles
router.get('/', roleController.getAllRoles)
router.get('/:id', roleController.getRole)

// Add Role
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), roleController.addRole)

// Edit Role
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), roleController.editRole)

// Assign Rights
router.post('/:id/rights', tokenExtractor, roleAuthority(['ADMIN']) , roleController.assignRights)

module.exports = router