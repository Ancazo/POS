const express = require('express')
const router = express.Router()
const salesController = require('../controllers/sales-controller')
const {authenticatedOnly: authenticatedOnlyMiddleware} = require('../middlewares/auth-middleware')

router.use(authenticatedOnlyMiddleware)//this has to pass before moving down


// main menu
router.get('/', salesController.main)

// sales routes
// index
router.get('/history', salesController.index)

// new
router.get('/new', salesController.newSalesForm)

// show
router.get('/history/:_id', salesController.show)

// create
router.post('/history', salesController.createSales)

// edit
router.get('/history/:_id/edit', salesController.editSales)

// update
router.patch('/history/:_id', salesController.updateSales)

// delete
router.delete('/history/:_id', salesController.deleteSales)

//logout
router.post('/logout', salesController.logout)

module.exports = router