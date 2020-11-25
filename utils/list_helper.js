const dummy = (blogs) => {
//   return 1
  return blogs[0]
}

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes
//   return 5
}

const favoriteBlog = (listWithBlogs) => {
  const likes = listWithBlogs.map(blog => blog.likes)
  const mostLikes = Math.max(...likes)
  return listWithBlogs.find(blog => blog.likes === mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

