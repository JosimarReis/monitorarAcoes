var express = require("express");
var app = express();
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

const database = require("./config/mongodb");


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

//Conecta ao mongoDB
mongoose.connect(database.database, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "+--| connection error:"));
db.once("open", function() {
  console.log("+--+------------------------------------+");
  console.log("+--| MongoDB Conectado                  |");
  app.use(express.static("public"));

  const port = normalizaPort(process.env.PORT || "3000");
  function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }
  app.listen(port, function() {
    console.log("+--+------------------------------------+");
    console.log(`+--| App rodando na porta ${port}          |`);
    console.log("+--+------------------------------------+");

  });
  require('./routes')(app)
  require('./routes/empresas')(app)
  require('./routes/papeis')(app)
  // respond with "hello world" when a GET request is made to the homepage
});
module.exports = app;
