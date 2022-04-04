const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const recordList = require('../../record.json').results

const SEED_USER = {
  name: '廣志'
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
    const user = await User.create({
      name: SEED_USER.name,
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
