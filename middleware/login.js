module.exports = {
  loginCheck: (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
      req.flash('warning_msg', '有必填欄位未填寫。')
      return res.render('login', {
        email,
        password
      })
    }
    next()
  }
}