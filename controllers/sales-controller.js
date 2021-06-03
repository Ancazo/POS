const _ = require('lodash')
const {SalesModel} = require('../models/sales')
const {CustomerModel} = require('../models/customers')
const {ProductModel} = require('../models/products')


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

        SalesModel.findOne()
            .then(item => {
                console.log(req.params.slug)
                res.render('sales/show', {
                    sales: item,
                })
            })
            .catch(err => {
                res.redirect('sales/new')
            })
        },

    newSalesForm: async (req, res) => {
        const customers = await CustomerModel.find()
        const products = await ProductModel.find()
        res.render('sales/new', {customers, products})
    },

    createSales: (req, res) => {
        console.log(req.body)
        SalesModel.create({
            customerId: req.body.customerId,
            productId: req.body.productId,
            productQuantity: req.body.productQuantity,
            productPrice: req.body.productPrice,
            totalPrice: req.body.totalPrice,
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
        SalesModel.findOne({ slug: req.params.slug })
        .then(item => {
            res.render('sales/edit', {
                sales: item,
            })
        })
        .catch(err => {
            res.redirect('/sales/history')
        })
    },

    updateSales: (req, res) => {
        let newSlug = _.kebabCase(req.body.salesOrderId)

        SalesModel.updateOne(
            { slug: req.params.slug },
            {
                $set: {
                    salesOrderNumber: req.body.salesOrderId,
                    customerId: req.body.customerId,
                    productId: req.body.productId,
                    productQuantity: req.body.productQuantity,
                    productPrice: req.body.productPrice,
                    totalPrice: req.body.totalPrice,
                    slug: newSlug
                }
            }
        )
            .then(updateResp => {
                res.redirect('/sales/history/' + newSlug)
            })
            .catch(err => {
                res.redirect('/sales/history/')
            })
    },

    deleteSales: (req, res) => {
        SalesModel.deleteOne( { slug: req.params.slug } )
        .then(deleteResp => {
            res.redirect('/sales/history/')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/sales/history/')
        })
    },

    main: (req, res) => {
        res.render('main/main')
    }

}