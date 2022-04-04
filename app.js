const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const Record = require('./models/record')
const Category = require('./models/category')

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

app.use(express.static('public'))

app.get('/', (req, res) => {
  const name = req.query.sort
  Category.findOne({ name })
    .then(category => {
      let categoryId = ''
      const sortResult = category ? {
        categoryId: category._id
      } : {}
      Record.find(sortResult)
        .lean()
        .then(records => {
          records.forEach(record => {
            const year = record.date.getFullYear()
            const month = record.date.getMonth() + 1
            const date = record.date.getDate()
            record.date = year + '/' + month + '/' + date
            Category.findById(record.categoryId)
              .then(category => {
                switch (category.name) {
                  case '家居物業':
                    record.categoryIcon = 'fa-solid fa-house'
                    break
                  case '交通出行':
                    record.categoryIcon = 'fa-solid fa-van-shuttle'
                    break
                  case '休閒娛樂':
                    record.categoryIcon = 'fa-solid fa-face-grin-beam'
                    break
                  case '餐飲食品':
                    record.categoryIcon = 'fa-solid fa-utensils'
                    break
                  default:
                    record.categoryIcon = 'fa-solid fa-pen'
                }
              })
          })
          let totalAmount = 0
          for (let i = 0; i < records.length; i++) {
            totalAmount += records[i].amount
          }
          res.render('index', { records, totalAmount, sort: name })
        })
    })
})

// app.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .then(records => {
//       records.forEach(record => {
//         const year = record.date.getFullYear()
//         const month = record.date.getMonth() + 1
//         const date = record.date.getDate()
//         record.date = year + '/' + month + '/' + date
//         Category.findById(record.categoryId)
//           .then(category => {
//             switch (category.name) {
//               case '家居物業':
//                 record.categoryIcon = 'fa-solid fa-house'
//                 break
//               case '交通出行':
//                 record.categoryIcon = 'fa-solid fa-van-shuttle'
//                 break
//               case '休閒娛樂':
//                 record.categoryIcon = 'fa-solid fa-face-grin-beam'
//                 break
//               case '餐飲食品':
//                 record.categoryIcon = 'fa-solid fa-utensils'
//                 break
//               default:
//                 record.categoryIcon = 'fa-solid fa-pen'
//             }
//           })
//       })
//       let totalAmount = 0
//       for (let i = 0; i < records.length; i++) {
//         totalAmount += records[i].amount
//       }
//       res.render('index', { records, totalAmount })
//     })
// })

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`)
})
