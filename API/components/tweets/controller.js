const createModel = require('./model')
const Model = createModel('whatsapp')

async function listTweetsByUser(id, labels, page, limit) {
  let results = []
  const startIndex = (page - 1) * limit

  // foreach label push a promise
  labels.forEach(async (label) => {
    results.push(getTweetsById(id, label, startIndex, limit))
  })

  //resolve all promises
  return Promise.all(results)
}

//get all tweets from a user and a label
async function getTweetsById(id, label, startIndex, limit) {
  
  // get the model/collection by label
  const Model = createModel(label)
  
  try {
    
    const query = { $or: [ {"user.username": id}, {"user.id": id} ] }
    //count total docs
    const count = await Model.countDocuments(query);

    //get data
    const data = await Model.find(query).limit(limit).skip(startIndex)
    // if(data.length == 0) throw new Error('Bad Request, couldnt found data for ' + label)
    
    //format result
    return { [label]: data, results:count}
  }
  catch(error){
    console.error(error)
    throw new Error(error)
  }
}

async function countTotalDocuments(id) {
  const query = { $or: [ {"user.username": id}, {"user.id": id} ] }
  return Model.countDocuments(query)
}

module.exports = {
  listTweetsByUser,
  getTweetsById,
  countTotalDocuments
}