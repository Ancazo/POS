
// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const session = require('express-session')
const salesController = require('./controllers/sales-controller')
const salesRouter = require('./routers/sales-router')
const productsRouter = require('./routers/products-router')
// const customersRouter = require('./routers/customers-router')
const userController = require('./controllers/user_controller')

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

app.use(session({ //setup express session as middleware. this is needed for login to work
  secret: process.env.SESSION_SECRET,
  name: 'user_session',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

// =======================================
//              ROUTES
// =======================================

app.use ('/sales', salesRouter)

app.use ('/products', productsRouter)

// app.use ('/customers', customersRouter)

// users

app.get('/user/register', guestOnlyMiddleware, userController.registerForm)

app.post('/user/register', guestOnlyMiddleware,  userController.registerUser)

app.get('/user/login', guestOnlyMiddleware, userController.loginForm)

app.post('/user/login', guestOnlyMiddleware, userController.loginUser)

// app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

app.post('/user/logout', authenticatedOnlyMiddleware, userController.logout)


// =======================================
//              LISTENER
// =======================================
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`POS app listening on port: ${port}`)
  })
})

