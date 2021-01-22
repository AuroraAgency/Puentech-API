const express = require('express');
const router = express.Router();
const { getTweets,  countTotalDocuments } = require('./controller')
const pagination = require('../../lib/pagination')
const config = require('../../config/index')
const DOMAIN = config.app.domain

//methods
router.get('/:id', list)

//handlers
async function list(req, res, next) {
  let ENDPOINT = DOMAIN + req.baseUrl + req._parsedUrl.pathname
  const id = req.params.id
  const params = req.query.tags? req.query.tags : null
  const tags = params? params.split(',') : null
  
  let options =  {
    limit: parseInt(req.query.limit) || 5,
    page: parseInt(req.query.page) || 1,
    params: params,
    tags: tags,
  }
  let query
  
  if(params !== null) {
    query = {
      $and: [ 
        { "label": { $elemMatch: {$eq: params} } }, 
        { $or: [ {"user.username": id}, {"user.id": id} ] } 
      ]
    } 
  }
  else {
    query = { "label": { $elemMatch: {$eq: id} } }
  }
  
  try {
    const data = await Promise.all([
      countTotalDocuments(query),
      getTweets(query, options),
    ]);
    const count = data[0];
    const info = pagination(ENDPOINT, count, options);

    res.status(200).send({
      error: '',
      info,
      results: data[1],
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = router;