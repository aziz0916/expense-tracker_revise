const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const CATEGORY = {
  家居物業: 'fa-solid fa-house',
  交通出行: 'fa-solid fa-van-shuttle',
  休閒娛樂: 'fa-solid fa-face-grin-beam',
  餐飲食品: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen'
}

router.get('/', (req, res) => {
  const name = req.query.sort
  const userId = req.user._id

  Category.findOne({ name })
    .then(category => {
      let categoryId = ''
      const sortResult = category ? {
        categoryId: category._id
      } : {}
      return Promise.all([
        Record.find({ $and: [sortResult, { userId }] }).lean(),
        Category.find().lean()
      ])
        .then(([records, categories]) => {
          records.forEach(record => {
            const year = record.date.getFullYear()
            const month = record.date.getMonth() + 1
            const date = record.date.getDate()
            record.date = year + '/' + month + '/' + date
            categories.forEach(category => {
              if (record.categoryId.toString() === category._id.toString()) {
                switch (category.name) {
                  case '家居物業':
                    record.categoryIcon = CATEGORY.家居物業
                    break
                  case '交通出行':
                    record.categoryIcon = CATEGORY.交通出行
                    break
                  case '休閒娛樂':
                    record.categoryIcon = CATEGORY.休閒娛樂
                    break
                  case '餐飲食品':
                    record.categoryIcon = CATEGORY.餐飲食品
                    break
                  default:
                    record.categoryIcon = CATEGORY.其他
                }
              }
            })
          })
          let totalAmount = 0
          for (let i = 0; i < records.length; i++) {
            totalAmount += records[i].amount
          }
          res.render('index', { records, totalAmount, sort: name })
        })
        .catch(err => console.log(err))
    })
})

module.exports = router
