const twitter = require('../components/tweets/network.js')

const router = (server) => {
  const API = '/api/v1'
  server.use(API + '/tweets', twitter)
}

module.exports = router;
