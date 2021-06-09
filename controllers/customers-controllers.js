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
        let customers = []

        try {
            customers = await CustomerModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
        res.render('history/customers-list', {
            customers: customers,
        })
    },

    show:  (req, res) => {
        let customer = {}

        CustomerModel.findById(req.params._id) // almost same as findOne({_id:id})
            .then(item => {
                res.render('customers/show', {
                    customer: item,
                })
            })
            .catch(err => {
                res.redirect('/customers')
            })
        },

    newCustomerForm:  (req, res) => {

        res.render('customers/new')
    },
    
    createCustomer: (req, res) => {
        CustomerModel.create({
            name: req.body.name,
            contact: req.body.contact,
        })
            .then(createResp => {
                res.redirect('/customers')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/customers')
            })
    },

    editCustomer: (req, res) => {

        CustomerModel.findById(req.params._id)
        .then(item => {
            res.render('customers/edit', {
                customers: item,

            })
        })
        .catch(err => {
            res.redirect('/customers')
        })
    },

    updateCustomer: (req, res) => {

        CustomerModel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    name: req.body.name,
                    contact: req.body.contact,
                }
            }
        )
            .then(updateResp => {
                res.redirect('/customers')
            })
            .catch(err => {
                res.redirect('/customers')
                console.log(err)
            })
    },

    deleteCustomer: (req, res) => {
        CustomerModel.deleteOne( { _id: req.params._id } )
        .then(deleteResp => {
            res.redirect('/customers')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/customers')
        })
    },
}