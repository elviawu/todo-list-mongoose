const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport') // 寫在express-session之後
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 成功登出訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 尚未登入訊息
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}`)
})