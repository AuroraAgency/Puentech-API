const express = require('express');
const router = express.Router();
const { listTweets, getTweetsById } = require('./controller')

//methods
router.get('/:id', list)

//handlers
async function list(req, res) {
  const userId = req.params.id
  const params = req.query.labels
  const labels = params.split(',')

  await listTweets(userId, labels)
  .then(tweets => res.status(200).send(tweets))
  .catch(err => res.status(500).send(err))
}

module.exports = router;