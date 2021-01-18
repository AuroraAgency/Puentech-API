const express = require('express');
const router = express.Router();
const { listTweets } = require('./controller')

//methods
router.get('/:id', list)

//handlers
async function list(req, res) {
  const userId = req.params.id
  const params = [req.query.labels]
  console.log(userId)
  await listTweets(userId, params)
  .then(tweets => res.send(tweets))
  .catch(err => res.send(err))
}

module.exports = router;