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

        SalesModel.findById(req.params._id) // almost same as findOne({_id:id})
            .then(item => {
                res.render('sales/show', {
                    sales: item,
                })
            })
            .catch(err => {
                res.redirect('/sales')
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
        SalesModel.findById(req.params._id)
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

        SalesModel.updateOne(
            { _id: req.params._id },
            {
                
                $set: {
                    customerId: req.body.customerId,
                    productId: req.body.productId,
                    productQuantity: req.body.productQuantity,
                    productPrice: req.body.productPrice,
                    totalPrice: req.body.totalPrice,
                }
            }
        )
            .then(updateResp => {
                res.redirect('/sales/history/')
            })
            .catch(err => {
                res.redirect('/sales/history/')
            })
    },

    deleteSales: (req, res) => {
        SalesModel.deleteOne( { _id: req.params._id } )
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