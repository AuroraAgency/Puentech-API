const express = require('express');
const router = express.Router();
const { listTweets, getTweetsById } = require('./controller')
const pagination = require('../../lib/pagination')
const config = require('../../config/index')
const DOMAIN = config.app.domain

//methods
router.get('/:id', list)

//handlers
async function list(req, res, next) {
  const ENDPOINT = DOMAIN + req.originalUrl
  const userId = req.params.id
  const params = req.query.labels
  const labels = params.split(',')
  const page = parseInt(req.query.page) || 1
  const limit = req.params.limit || 5

  console.log(ENDPOINT)
  await listTweets(userId, labels, page, limit)
  .then(tweets => {
    let response = {}

    // format response
    response.info = {
      results: { total: 0 },
      limit: limit * tweets.length,
    }

    tweets.forEach((tweet) => {
      const results = tweet.results
      delete tweet.results
      response.info.results.total += results
      
      const name = Object.keys(tweet)
      response[name] = tweet[name]
      
      if(tweets.length > 1) {
        response.info.results[name] = results
      }
    })
    
    response.info.pages = Math.ceil(response.info.results.total / response.info.limit)

    const paginationDetails = pagination(response.info.limit, page, response.info.results.total, API, userId, params)

    response.info.next = paginationDetails.next || false
    response.info.prev = paginationDetails.prev || false
    res.status(200).send(response)
  })
  .catch(next)
}

module.exports = router;