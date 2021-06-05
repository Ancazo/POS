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

    show:  (req, res) => {
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
        res.render('sales/new', {
            customers, 
            products
        })
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

    editSales: async (req, res) => {
        const customers = await CustomerModel.find()
        const products = await ProductModel.find()
        SalesModel.findById(req.params._id)
        .then(item => {
            res.render('sales/edit', {
                sales: item,
                customers,
                products
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
    }, 




    //user
    registerForm: (req, res) => {
        res.render('login/register')
    },

    registerUser: async (req, res) => {
        // validate first & last name
        if (!req.body.first_name || !req.body.last_name) {
            res.redirect('/user/register')
            return
        }

        // ensure password and confirm password matches
        if (req.body.password !== req.body.password_confirm) {
            res.redirect('/user/register')
            return
        }

        // ensure that there is no existing user account with the same email given
        let user = null
        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/user/register')
            return
        }
        if (user) {
            res.redirect('/user/register')
            return
        }

        const timestampNow = moment().utc()
        
        // hashing using sha256
        // const salt = uuidv4()
        // const saltedPassword = salt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)

        // hashing using bcrypt
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)

        try {
            await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                // pwsalt: salt,
                // hash: hashInstance.digest('hex'),
                hash: generatedHash,
                created_at: timestampNow,
                updated_at: timestampNow,
            })
        } catch(err) {
            console.log(err)
            res.redirect('/user/login')
            return
        }
        
        res.redirect('/user/login')
    },

        loginForm: (req, res) => {

        res.render('login/login')

    },

    loginUser: async (req, res) => {
        
        let user = null

        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch(err) {
            console.log(err)
            res.redirect('/user/login')
            return
        }

        if (!user) {
            res.redirect('/sales')
            return
        }

        // try to check if given password is correct
        // const saltedPassword = user.pwsalt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)
        // const hashedPassword = hashInstance.digest('hex')

        // compare hashed passwords against hash in db
        // if (hashedPassword !== user.hash) {
        //     res.redirect('/users/register')
        //     return
        // }

        const isValidPassword = await bcrypt.compare(req.body.password, user.hash)
        if (!isValidPassword) {
            res.redirect('/user/login')
            return
        }

        req.session.user = user
        res.redirect('/sales')
    },

}