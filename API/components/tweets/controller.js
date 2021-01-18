const createModel = require('./model')

function listTweets(labels) {

  return new Promise((resolve, reject) => {
    // console.log(labels)
    labels.forEach(async label => {
      // console.log(label)
      const Model = await createModel(label.toString())
      // console.log(Model)
      await Model.find({}, (err, data) => {
        if(err) {
          // console.log(err)
          return reject('[Error controller] ', err)
        }
        // console.log(data)
        return resolve(data)
      })
    })
  });
}

module.exports = {
  listTweets
}