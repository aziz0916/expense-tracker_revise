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
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = '624877c5c6e46b7ce5f03405'
  const { name, date, category, amount } = req.body
  
  return Record.create({
    name,
    date,
    amount,
    userId,
    categoryId: category
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router
