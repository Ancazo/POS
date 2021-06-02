const _ = require('lodash')
const {SalesModel} = require('../models/sales')
const {CustomerModel} = require('../models/customers')


module.exports = {
    index: async (req, res) => {
        let sales = []

        try {
            sales = await SalesModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        res.render('history/sales-history', {
            sales: sales,
        })
    },

    show: (req, res) => {
        let sales = {}

        SalesModel.findOne({ slug: req.params.slug })
            .then(item => {
                console.log(req.params.slug)
                res.render('products/show', {
                    sales: item,
                })
            })
            .catch(err => {
                res.redirect('products/new')
            })
        },

    newSalesForm: (req, res) => {
        res.render('products/new')
    },

    createSales: (req, res) => {
        let slug = _.kebabCase(req.body.salesOrderId)

        SalesModel.create({
            salesOrderNumber: req.body.salesOrderId,
            customerId: req.body.customerId,
            productId: req.body.productId,
            productQuantity: req.body.productQuantity,
            productPrice: req.body.productPrice,
            totalPrice: req.body.totalPrice,
            slug: slug
        })
            .then(createResp => {
                res.redirect('/sales/history')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/sales/history')
            })
    },

    editSales: (req, res) => {
        
    },

    updateSales: (req, res) => {
        
    },

    deleteSales: (req, res) => {
        
    },
}