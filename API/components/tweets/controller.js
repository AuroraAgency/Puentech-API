const createModel = require('./model')

async function listTweets(id, labels) {
  let promises = []
  return new Promise(async(resolve, reject) => {

  // foreach label push a promise
  await labels.forEach(async (label) => {
    promises.push(getTweetsById(id, label))
  })

  //resolve all promises
  Promise.all(promises)
    .then(results => {
      let response = {}

      //format response
      results.forEach((result, index) => {
        let name = Object.keys(result)
        if(result[name].length > 0) {
          response[name] = result[name]
        }
      })

      resolve(response)
    })
    .catch(err => reject(err))
  })
}

//get all tweets from a user and a label
function getTweetsById(id, label) {
  return new Promise(async(resolve, reject) => {
    // get the model/collection by label
    const Model = createModel(label)

    //Find documents by username or id
    await Model.find( { $or: [ {"user.username": id}, {"user.id": id} ] })
    .then(data => resolve({ [label]: data }))
    .catch(err => reject(err))
  })
}

module.exports = {
  listTweets,
  getTweetsById
}