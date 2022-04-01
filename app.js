const express = require('express')
const app = express()

require('./config/mongoose')

const PORT = 3000

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`)
})
