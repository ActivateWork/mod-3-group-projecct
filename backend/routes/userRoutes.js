const express = require('express')
const router = express.Router()
// import the controller here
const userController = require('../controllers/userController')

router.get('/', userController.show)
router.get('/list', userController.index)
router.put('/', userController.update)

module.exports = router
