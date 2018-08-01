let MitigationRouter = require('../routes') 
let db_service = require('../db_service')

module.exports.respond = function (event, cb) {


  var context = requestToContext(event.queryStringParameters)
  
  var dataSource = MitigationRouter(db_service)
  
  if (Object.keys(context).length === 0) {
    return cb(
      'Request not supported' +
      JSON.stringify(context) +
      JSON.stringify(event),
      null
    )
  }
  
  if (typeof context.method === 'undefined' || context.method.length === 0) {
    return cb('No query method provided', null)
  }

  if (typeof dataSource[context.method] === 'undefined') {
    return cb('Data source does not implement the requested method ' + context.method,null)
  }

  if (context.method === 'set') {
    obs = dataSource[context.method](context.jsonGraph)
  } else if (context.method === 'call') {
    obs = dataSource[context.method](context.callPath, context.args, context.refPaths, context.thisPaths)
  } else {
    obs = dataSource[context.method]([].concat(context.paths))
  }

  obs.subscribe(function(jsonGraphEnvelope) {
      cb(null, jsonGraphEnvelope)
  }, function (err) {
    return cb('subscribe error' + err, null)
  })
}

var parseArgs = {
  'jsonGraph': true,
  'callPath': true,
  'args': true,
  'refPaths': true,
  'thisPaths': true,
  'paths': true
}

function requestToContext(queryMap) {
  var context = {}
  if (queryMap) {
    Object.keys(queryMap).forEach(function(key) {
      var arg = queryMap[key]
      if (parseArgs[key] && arg && (typeof arg === 'string')) {
        arg = arg.replace(/'/g, '"')
        arg = decodeURI(arg).replace(/%2C/g, ',').replace(/%3A/g, ':')
        context[key] = JSON.parse(arg)
      } else {
         context[key] = arg
      }
    })
  }
  return context
}
module.exports.close = () => {
 return db_service.end()
}