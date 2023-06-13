const router = require('express').Router()

const { tokenExtractor, roleAuthority } = require('../utils/midwares')

const rightController = require('../controllers/rights')

// get rights
router.get('/', rightController.getAllRights)
router.get('/:id', rightController.getRight)

// add role
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), rightController.addRight)

module.exports = router