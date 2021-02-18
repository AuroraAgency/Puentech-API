const twitter = require("../components/tweets/network.js");
const config = require("../config/index");
const cors = require("cors");
var corsOptions = {
  origin: config.app.origin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const router = (server) => {
  const API = "/api/v1";
  server.use(API + "/tweets", cors(corsOptions), twitter);
};

module.exports = router;
