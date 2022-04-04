const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const recordList = require('../../record.json').results

const SEED_USER = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678'
}

async function createSeed(userId, record, categoryName) {
  try {
    const category = await Category.findOne({ name: categoryName })
    const categoryId = category._id
    record.userId = userId
    record.categoryId = categoryId
    await Record.create(record)
  } catch (err) {
    console.log(err)
  }
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    const userId = user._id
    for (let i = 0; i < recordList.length; i++) {
      await createSeed(userId, recordList[i], recordList[i].category)
    }
    console.log('done')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
