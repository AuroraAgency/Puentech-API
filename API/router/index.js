const twitter = require('../components/tweets/network.js')

const router = (server) => {
  server.use('/tweets', twitter)
}

module.exports = router;
