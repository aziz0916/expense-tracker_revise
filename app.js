const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()

const routes = require('./routes')
require('./config/mongoose')
const PORT = 3000

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

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`)
})
