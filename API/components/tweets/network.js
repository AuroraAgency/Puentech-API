const express = require('express');
const router = express.Router();
const { listTweets } = require('./controller')

//methods
router.get('/', list)

//handlers
async function list(req, res) {
  const params = [req.query.labels]

  await listTweets(params)
  .then(tweets => res.send(tweets))
  .catch(err => res.send(err))
}

module.exports = router;