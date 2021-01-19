const createModel = require('./model')

async function listTweets(id, labels) {
  let results = []
  // foreach label push a promise
  labels.forEach(async (label) => {
    results.push(getTweetsById(id, label))
  })
  //resolve all promises
  return Promise.all(results)
}

//get all tweets from a user and a label
async function getTweetsById(id, label) {

  // get the model/collection by label
  const Model = createModel(label)
  try {
    //Find documents by username or id
    const data = await Model.find({ $or: [ {"user.username": id}, {"user.id": id} ] })
    if(data.length == 0) throw new Error('Bad Request, couldnt found data for ' + label)

    //format result
    return { [label]: data }
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