const router = require('express').Router()

const userController = require('../controllers/users')
const { tokenExtractor, roleAuthority } = require('../utils/midwares')

// Get Users
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)

// Create User
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), userController.addUser)

// Edit User
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), userController.editUser)

// Assign Roles
router.post('/:id/roles', tokenExtractor, roleAuthority(['ADMIN']) , userController.assignRoles)


module.exports = router