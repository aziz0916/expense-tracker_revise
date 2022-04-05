const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body

  return Record.create({
    name,
    date,
    amount,
    userId,
    categoryId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Promise.all([
    Record.findOne({ _id, userId }).lean(),
    Category.find().lean()
  ])
    .then(([record, categories]) => {
      //需將record.date的value調整為YY-MM-DD格式才能在Handlebars的input中的value顯示，MM與DD必須為兩位數，假如不足兩位需在前面補0
      const year = (record.date.getFullYear()).toString()
      let month = (record.date.getMonth() + 1).toString()
      let date = (record.date.getDate()).toString()
      if (month.length < 2) {
        month = '0' + month
      }
      if (date.length < 2) {
        date = '0' + date
      }
      record.date = year + '-' + month + '-' + date
      Category.findOne({ _id: record.categoryId })
        .then(category => {
          res.render('edit', { record, categories, categoryName: category.name })
        })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body

  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
