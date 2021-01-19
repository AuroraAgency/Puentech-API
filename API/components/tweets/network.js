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
    response.info = {
      limit: tweets[0].info.limit,
      next: tweets[0].info.next || false,
      prev: tweets[0].info.prev || false,
      pages: 0,
      results: 0,
    }

    tweets.forEach((tweet) => {
      const info = tweet.info
      delete tweet.info

      const name = Object.keys(tweet)
      response[name] = tweet[name]

      if(tweets.length > 1) {
        let { startIndex, prev, next, limit, ...rest} = info
        response.info[name] = rest
      }

      response.info.pages += info.pages
      response.info.results += info.results
    })
    
    res.status(200).send(response)
  })
  .catch(next)
}

module.exports = router;