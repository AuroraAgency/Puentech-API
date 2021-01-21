const express = require('express');
const router = express.Router();
const { listTweetsByUser, getTweetsById,  countTotalDocuments } = require('./controller')
const pagination = require('../../lib/pagination')
const config = require('../../config/index')
const DOMAIN = config.app.domain

//methods
router.get('/:id', list)

//handlers
async function list(req, res, next) {
  const ENDPOINT = DOMAIN + req.baseUrl + req._parsedUrl.pathname
  const id = req.params.id
  const params = req.query.labels? req.query.labels : null
  const labels = params? params.split(',') : null

  let options =  {
    limit: req.params.limit || 5,
    page: parseInt(req.query.page) || 1,
    startIndex: (page - 1) * limit,
    params: params,
    labels: labels,
  }
  if (params !== null) {
    console.log("hola")
      // options.query = { $or: [ {"user.username": id}, {"user.id": id} ] }
    // await listTweets(id, options)
    // .then(tweets => {
    //   let response = {}
  
    //   // format response
    //   response.info = {
    //     results: { total: 0 },
    //     limit: limit * tweets.length,
    //   }
  
    //   tweets.forEach((tweet) => {
    //     const results = tweet.results
    //     delete tweet.results
    //     response.info.results.total += results
        
    //     const name = Object.keys(tweet)
    //     response[name] = tweet[name]
        
    //     if(tweets.length > 1) {
    //       response.info.results[name] = results
    //     }
    //   })
      
    //   response.info.pages = Math.ceil(response.info.results.total / response.info.limit)
  
    //   const paginationDetails = pagination(response.info.limit, page, response.info.results.total, API, userId, params)
  
    //   response.info.next = paginationDetails.next || false
    //   response.info.prev = paginationDetails.prev || false
    //   res.status(200).send(response)
    // })
    // .catch(next)

  } 

  options.query = { "tweet.label": { $elemMatch: {$eq: id} } }

  Promise.all([
    getTweetsById(id, options),
    countTotalDocuments(options.query)
  ])
  .then((data) => {
    const count = data[1]
    const info = pagination(ENDPOINT, count, options)

    res.status(200).send({
      info,
      results: data[0],
    })
  })
  .catch(next)
}

module.exports = router;