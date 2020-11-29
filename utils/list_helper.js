const _ = require('lodash/core')
// var groupBy = require('lodash.groupby')

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

const mostBlogs = listOfBlogs => {
  const createHash = array => {
    const hash = {}
    for (let element of array) {
      hash[element] ? hash[element]++ : hash[element] = 1
    }
    return hash
  }

  const authors = listOfBlogs.map(item => item.author)
  const hashOfAuthors = createHash(authors)
  const mostBlogs = Math.max(...Object.values(hashOfAuthors))

  for (let author in hashOfAuthors) {
    if (hashOfAuthors[author] === mostBlogs) {
      return {
        author: author,
        blogs: mostBlogs
      }
    }

  }
}

// const mostLikes = listOfBlogs => {
//   const likes = listOfBlogs.map(blog => blog.likes)
//   const mostLikes = Math.max(...likes)
//   return listOfBlogs.find(blog => blog.likes === mostLikes)
// }

// const mostLikes = listOfBlogs => {
//   //how to find what author has the most likes?
//   //add all the likes of the authors
//   let sum = 0;
//   for (let i = 0; i < listOfBlogs.length; i++) {

//     //loop through arr of num(likes)

//     //groupBy author - push into arr
//     //obj.likes
//     //reduce



//     // if(listOfBlogs[i].author === mostLikes){
//     if (listOfBlogs[i].author === 'Edsger W. Dijkstra') {
//       sum += listOfBlogs[i].likes
//     }

//   }
//   return {
//     author: author,
//     likes: sum
//   }
//   // const hashOfAuthors = createHash(authors)

//   // const mostBlogs = Math.max(...Object.values(hashOfAuthors));

// }

// const mostLikes = listOfBlogs => {
//     const createHash = array => {
//       const hash = {}
//       for (let element of array) {
//         hash[element] ? hash[element]++ : hash[element] = 1
//       }
//       return hash
//     }
  
//     const authors = listOfBlogs.map(item => item.author)
//     const hashOfAuthors = createHash(authors)
//     const mostBlogs = Math.max(...Object.values(hashOfAuthors))
  
//     for (let author in hashOfAuthors) {
//       if (hashOfAuthors[author] === mostBlogs) {
//         return {
//           author: author,
//           blogs: mostLikes
//         }
//       }
  
//     }
//   }

// /*------------------------------------------------------------/*

// const mostLikes = listOfBlogs => {

//   if (listOfBlogs.length === 0) {
//     return { message: 'Blog list is empty' }
//   }

// //   const authorMostLikes = _.chain(listOfBlogs).groupBy('author').map((listOfBlogs,
//   const authorMostLikes = _.groupBy(listOfBlogs, 'author').map((listOfBlogs, 
//     author) => {
//     let likes = 0 // accumulate the likes per author
//     _.each(listOfBlogs, (blog) => {
//       likes += blog['likes']
//     })
//     return {
//       author: author,
//       likes: likes
//     }
//   }).orderBy('likes', 'desc').first().value()

//   return authorMostLikes
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
//   mostLikes
}

