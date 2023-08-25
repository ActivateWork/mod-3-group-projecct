const express = require('express')

const router = express.Router()

// imported controller 
const postController = require('../controllers/postController')

// seed route
router.post('/seed', postController.seed )
// index route
router.get('/', postController.index )
// delete route
router.delete('/:id', postController.delete)
// update route
router.patch('/:id', postController.update)
// create route
router.post('/', postController.create)
// show route
router.get('/:id', postController.show)

module.exports = router