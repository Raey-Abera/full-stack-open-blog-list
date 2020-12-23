const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { ErrorHelper } = require('../utils/error_helper')
const User = require('../models/user')

// usersRouter.post('/', async (request, response) => {
//   const body = request.body

//   const saltRounds = 10
//   const passwordHash = await bcrypt.hash(body.password, saltRounds)

//   const user = new User({
//     username: body.username,
//     name: body.name,
//     passwordHash,
//   })

//   const savedUser = await user.save()

//   response.json(savedUser)
// })

const validateRequestBody = (body) => {
  if (!body.username || !body.password) {
    throw new ErrorHelper(400, 'Bad Request', ['Username or Password missing'])
  }

  if (body.username.length < 3) {
    throw new ErrorHelper(422, 'Validation Error', [
      'Username must be at least (3) characters long',
    ])
  }

  if (body.password.length < 3) {
    throw new ErrorHelper(422, 'Validation Error', [
      'Password must be at least (3) characters long',
    ])
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    validateRequestBody(body)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})


module.exports = usersRouter