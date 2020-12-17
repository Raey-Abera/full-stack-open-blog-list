const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { ErrorHelper } = require('../utils/error_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response,) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log('this is authorization', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  console.log('THIS IS TOKEN', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  // const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author || '',
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// blogsRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })

blogsRouter.delete('/:id', async (req, res, next) => {
  const { token } = req
  console.log('this is DELETE test', token)
  console.log('this is REQ test', req)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      throw new ErrorHelper(401, 'Authentication Error', [
        'Invalid or missing authentication token',
      ])
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).end()

    const belongsToUser = blog.user.toString() === decodedToken.id
    if (belongsToUser) {
      await blog.remove()
      return res.status(204).end()
    }
    throw new ErrorHelper(403, 'Forbidden', [
      'User is not permitted to modify this resource',
    ])
  } catch (e) {
    return next(e)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author || '',
    url: body.url,
    likes: body.likes || 0
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter