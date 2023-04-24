// 引用epress和express路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 如果已經註冊：退回原本畫面
  User.findOne({ email }).then(user => {
    if(user) {
      console.log('user already exists')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password,
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
module.exports = router