// index.js
let falcorExpress = require('falcor-express');
let MitigationRouter = require('./routes')
let db_service = require('./db_service/index')

var express = require('express');
var app = express();
app.use('/graph', falcorExpress.dataSourceRoute(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return new MitigationRouter(db_service)
}));

// serve static files from current directory
app.use(express.static(__dirname + '/www'));

const port = 3333
var server = app.listen(3333)
console.log(`listening on port ${port}`)