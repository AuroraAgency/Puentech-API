const express = require("express");
const router = require("./router/index.js");
const DB = require("./db/mongo");
const config = require("./config/index");

const app = express();

//db conection
const DB_URI = `mongodb+srv://${config.db.db_user}:${config.db.db_password}@puentech.4m87s.mongodb.net/${config.db.db_name}?retryWrites=true&w=majority`;
DB(DB_URI);

//router
router(app);

//middleware to handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({
    results: "",
    message: err.message,
    code: res.statusCode,
  });
});

app.listen(config.app.port, () => {
  console.log("server running on port: " + config.app.port);
});
