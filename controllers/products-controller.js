const _ = require('lodash')
const {SalesModel} = require('../models/sales')
const {CustomerModel} = require('../models/customers')
const {ProductModel} = require('../models/products')
const {UserModel} = require('../models/users')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const { createHash } = require('crypto') 
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    index: async (req, res) => {
        let products = []

        try {
            products = await ProductModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
        res.render('history/products-list', {
            products: products,
        })
    },

    show:  (req, res) => {
        let products = {}

        ProductModel.findById(req.params._id) // almost same as findOne({_id:id})
            .then(item => {
                res.render('products/show', {
                    products: item,
                })
            })
            .catch(err => {
                res.redirect('/products')
            })
        },

    newProductForm:  (req, res) => {

        res.render('products/new')
    },
    
    createProduct: (req, res) => {
        console.log(req.body)
        ProductModel.create({
            name: req.body.name,
            price: req.body.price,
        })
            .then(createResp => {
                res.redirect('/products')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/products')
            })
    },

    editProduct: (req, res) => {

        ProductModel.findById(req.params._id)
        .then(item => {
            res.render('products/edit', {
                products: item,

            })
        })
        .catch(err => {
            res.redirect('/products')
        })
    },

    updateProduct: (req, res) => {

        ProductModel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                }
            }
        )
            .then(updateResp => {
                res.redirect('/products/')
            })
            .catch(err => {
                res.redirect('/products')
                console.log(err)
            })
    },

    deleteProduct: (req, res) => {
        ProductModel.deleteOne( { _id: req.params._id } )
        .then(deleteResp => {
            res.redirect('/products')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/products')
        })
    },
}