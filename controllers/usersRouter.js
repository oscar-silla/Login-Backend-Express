const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/users', async (request, response, next) => {
  await User.find().populate('notes', {
    content: 1,
    date: 1,
    done: 1
  })
    .then(users => response.status(200).json(users))
    .catch(err => next(err))
})

userRouter.post('/users', async (request, response, next) => {
  const {
    username,
    name,
    password
  } = request.body

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = {
    username,
    name,
    password: passwordHash
  }

  const user = new User(newUser)
  await user.save()
    .then(user => response.status(201).json(user))
    .catch(err => next(err))
})

module.exports = userRouter
