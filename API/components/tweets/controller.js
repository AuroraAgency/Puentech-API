const Model = require('./model')

//get all tweets from a user and a label
async function getTweets(query, {page, limit}) {
  const startIndex = (page - 1) * limit

  try {
    return Model.find(query).limit(limit).skip(startIndex)
  }
  catch(error){
    console.error(error)
    throw new Error(error)
  }
}

async function countTotalDocuments(query) {
  return Model.countDocuments(query)
}

module.exports = {
  getTweets,
  countTotalDocuments
}