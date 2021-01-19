const createModel = require('./model')
const pagination = require('../../lib/pagination')
const API = `http://localhost:3000/api/v1/tweets`

async function listTweets(id, labels) {
  let results = []

  // foreach label push a promise
  labels.forEach(async (label) => {
    results.push(getTweetsById(id, label, labels))
  })

  //resolve all promises
  return Promise.all(results)
}

//get all tweets from a user and a label
async function getTweetsById(id, label, labels) {
  const dbQuery = { $or: [ {"user.username": id}, {"user.id": id} ] }
  const queryDetails = {id, params: labels, dbQuery}

  // get the model/collection by label
  const Model = createModel(label)

  try {
    
    const paginationDetails = await pagination(Model, queryDetails, API)

    //Find documents by username or id
    const data = await Model.find(dbQuery).limit(paginationDetails.limit).skip(paginationDetails.startIndex)
    if(data.length == 0) throw new Error('Bad Request, couldnt found data for ' + label)
    

    //format result
    return { [label]: data, info: paginationDetails.info}
  }
  catch(error){
    console.error(error)
    throw new Error(error)
  }
}

module.exports = {
  listTweets,
  getTweetsById
}