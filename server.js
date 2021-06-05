
// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const session = require('express-session')
const salesController = require('./controllers/sales-controller')

const {
  authenticatedOnly: authenticatedOnlyMiddleware,
  guestOnly: guestOnlyMiddleware,
  setUserVarMiddleware
} = require('./middlewares/auth-middleware')

const app = express();
const port = 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

app.set('view engine', 'ejs')
// app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(express.static('public'))

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   name: 'user_session',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
// }))
// app.use(setUserVarMiddleware)

// =======================================
//              ROUTES
// =======================================

// main menu
app.get('/sales', salesController.main)

// sales routes
// index
app.get('/sales/history', salesController.index)

// new
app.get('/sales/new', salesController.newSalesForm)

// show
app.get('/sales/history/:_id', salesController.show)

// create
app.post('/sales/history', salesController.createSales)

// edit
app.get('/sales/history/:_id/edit', salesController.editSales)

// update
app.patch('/sales/history/:_id', salesController.updateSales)

// delete
app.delete('/sales/history/:_id', salesController.deleteSales)


// product routes
// index
// app.get('/sales/history', salesController.index)

// new
// app.get('/sales/new', salesController.newSalesForm)

// show
// app.get('/sales/history/:slug', salesController.show)

// create
// app.post('/sales/history', salesController.createSales)

// edit
// app.get('/sales/history/:slug/edit', salesController.editSales)

// update
// app.patch('/sales/history/:slug', salesController.updateSales)

// delete
// app.delete('/sales/history/:slug', salesController.deleteSales)
// product rating routes

// app.get('/products/:slug/ratings/new', productRatingController.newForm)

// app.post('/products/:slug/ratings', productRatingController.create)

// users

app.get('/user/register', guestOnlyMiddleware, salesController.registerForm)

app.post('/user/register', guestOnlyMiddleware,  salesController.registerUser)

app.get('/user/login', guestOnlyMiddleware, salesController.loginForm)

app.post('/user/login', guestOnlyMiddleware, salesController.loginUser)

// app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

// app.post('/users/logout', authenticatedOnlyMiddleware, userController.logout)


// =======================================
//              LISTENER
// =======================================
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`POS app listening on port: ${port}`)
  })
})

