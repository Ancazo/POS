const express = require('express')
const router = express.Router()
const customersController = require('../controllers/customers-controllers')
const {authenticatedOnly: authenticatedOnlyMiddleware} = require('../middlewares/auth-middleware')

router.use(authenticatedOnlyMiddleware)//this has to pass before moving down


// products routes
// index
router.get('/', customersController.index)

// new
router.get('/new', customersController.newCustomerForm)

// show
router.get('/:_id', customersController.show)

// create
router.post('/new', customersController.createCustomer)

// edit
router.get('/:_id/edit', customersController.editCustomer)

// update
router.patch('/:_id', customersController.updateCustomer)

// delete
router.delete('/:_id', customersController.deleteCustomer)


module.exports = router