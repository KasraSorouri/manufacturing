const router = require('express').Router()

const userController = require('../controllers/users')
const { tokenExtractor, roleAuthority } = require('../utils/midwares')

// get users
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser) 

// create user
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), userController.addUser)

//  edit user
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), userController.editUser)

// assign roles
router.post('/:id/roles', tokenExtractor, roleAuthority(['ADMIN']) , userController.assignRoles)


module.exports = router