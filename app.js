const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
  helpers: {
    // 建立selected函式來讓index.handlebars中select的option被選取時產生selected
    selected: function (option, value) {
      if (option === value) {
        return 'selected'
      } else {
        return ''
      }
    }
  }
}))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`)
})
