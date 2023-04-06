const express = require('express')
const router = express.Router()
// 引入home模組程式碼
const home = require('./modules/home')
// 將網址結構符合/字串的request導向home模組
router.use('/', home)
// 引入todos模組程式碼
const todos = require('./modules/todos')
// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/todos', todos)
module.exports = router