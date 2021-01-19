const express = require('express');
const router = express.Router();
const { listTweets, getTweetsById } = require('./controller')

//methods
router.get('/:id', list)

//handlers
async function list(req, res, next) {
  const userId = req.params.id
  const params = req.query.labels
  const labels = params.split(',')

  await listTweets(userId, labels)
  .then(tweets => {
    let response = {}

    // format response
    tweets.forEach((tweet) => {
      const name = Object.keys(tweet)
      response[name] = tweet[name]
    })
    
    res.status(200).send(response)
  })
  .catch(next)
}

module.exports = router;