const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/login', async (request, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordChecked = (!user) ? false : await bcrypt.compare(password, user.password)

  console.log(passwordChecked)
  if (!passwordChecked) {
    response.status(401).json({ error: 'Invalid user or password' })
  } else {
    const infoToken = {
      username: user.username,
      userId: user.id
    }
    const token = await jwt.sign(infoToken, process.env.SECRET)
    response.status(200).json({
      userId: user.id,
      username: user.username,
      name: user.name,
      token
    })
  }
})

module.exports = loginRouter
