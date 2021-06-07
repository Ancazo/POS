const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products-controller')
const {authenticatedOnly: authenticatedOnlyMiddleware} = require('../middlewares/auth-middleware')

router.use(authenticatedOnlyMiddleware)//this has to pass before moving down


// products routes
// index
router.get('/', productsController.index)

// new
router.get('/new', productsController.newProductForm)

// show
router.get('/:_id', productsController.show)

// create
router.post('/new', productsController.createProduct)

// edit
router.get('/:_id/edit', productsController.editProduct)

// update
router.patch('/:_id', productsController.updateProduct)

// delete
router.delete('/:_id', productsController.deleteProduct)


module.exports = router