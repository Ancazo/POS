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
                res.redirect('history/sales-history')
            })
        },

    newSalesForm: (req, res) => {
        
    },

    createSales: (req, res) => {
        
    },

    editSales: (req, res) => {
        
    },

    updateSales: (req, res) => {
        
    },

    deleteSales: (req, res) => {
        
    },
}