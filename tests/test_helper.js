// const bcrypt = require("bcrypt")
//const logger = require('../utils/logger')
// const User = require("../models/user")
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
            'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
            'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'mytitle', url: 'http://myurl.com', })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogWithMissingTitle = {
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 0
}

const blogWithMissingLikes = {
  title: '17 Obscure Horror Games We Recommend',
  author: 'Ryan Stanford',
  url:
        'https://www.relyonhorror.com/articles/17-obscure-horror-games-we-recommend/',
}


const blogWithMissingUrl = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  likes: 0,
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const plainUsers = [
  {
    username: 'username',
    name: 'Username',
    password: 'password',
  },
  {
    username: 'username2',
    name: 'Username2',
    password: 'password2',
  },
  {
    username: 'username3',
    name: 'Username3',
    password: 'password3',
  },
]

const hashPasswordMixin = (users) => {
  const saltRounds = 1
  const clonedUsers = JSON.parse(JSON.stringify(users))
  const usersWithHashedPasswords = clonedUsers.map((user) => {
    const passwordHash = bcrypt.hashSync(user.password, saltRounds)
    user.passwordHash = passwordHash
    delete user.password

    return user
  })

  return usersWithHashedPasswords
}

const initialUsers = hashPasswordMixin(plainUsers)

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  blogWithMissingTitle,
  blogWithMissingLikes,
  blogWithMissingUrl,
  usersInDb,
  initialUsers
}

