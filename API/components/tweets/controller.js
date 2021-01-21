const createModel = require('./model')
const Model = createModel('whatsapp')

async function listTweetsByUser(id, options) {
  let results = []
  const startIndex = (options.page - 1) * options.limit

  // foreach label push a promise
  options.labels.forEach(async (label) => {
    results.push(getTweetsById(id, label, startIndex, options.limit))
  })

  //resolve all promises
  return Promise.all(results)
}

//get all tweets from a user and a label
async function getTweetsById(id, options) {
  try {
    //return data
    return Model.find(options.query).limit(options.limit).skip(options.startIndex)
    // if(data.length == 0) throw new Error('Bad Request, couldnt found data for ' + label)
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
  listTweetsByUser,
  getTweetsById,
  countTotalDocuments
}