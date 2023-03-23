const express = require('express')
const mongoose = require('mongoose')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App is running on https://localhost:${port}`)
})