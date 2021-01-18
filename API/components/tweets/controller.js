const createModel = require('./model')

async function listTweets(id, labels) {

  let response = []
  return await new Promise(async(resolve, reject) => {
    labels = ["whatsapps", "facebook"]
    console.log(labels)
    // get all documents for each label
    await labels.forEach(async label => {
      console.log(label)
      // create model 
      const Model = await createModel(label.toString())
      console.log(Model)

      //Find documents by username or id
      await Model.find({ $or: [{"user.username": id}, {"user.id": id}]}, (err, data) => {
        if(err) {
          console.log(err)
          return reject('[Error controller] ', err)
        }
        resolve(response.push( {[label]: data} ))
      })
    })
  })
  .then(() => {
    console.log(response)
    return response
  })
  .catch((err) => err)
}

module.exports = {
  listTweets
}