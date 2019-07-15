// index.js
const cluster = require('cluster');

let falcorExpress = require('falcor-express');
let MitigationRouter = require('./routes')
let db_service = require('./db_service/index')

const NUM_WORKERS = 8;
// const { AUTH_URI, AUTH_PROJECT_NAME } = require('./server-config');

// https://medium.com/tech-tajawal/clustering-in-nodejs-utilizing-multiple-processor-cores-75d78aeb0f4f
const workers = [];
const PORT = 3333;

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  // to read number of cores on system
  console.log('Master cluster setting up ' + NUM_WORKERS + ' workers');

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < NUM_WORKERS; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork());

    // to receive messages from worker process
    workers[i].on('message', function(message) {
      console.log(message);
    });
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is listening');
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function(worker, code, signal) {
    console.log(
      'Worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal
    );
    console.log('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    // to receive messages from worker process
    workers[workers.length - 1].on('message', function(message) {
      console.log(message);
    });
  });
};


var express = require('express');
var app = express();
const setUpExpress = () => {
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
	app.use('/graph', falcorExpress.dataSourceRoute(function (req, res) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  
	  return MitigationRouter(db_service)
	}));

	// serve static files from current directory
	app.use(express.static(__dirname + '/www'));
	var server = app.listen(PORT)
	// console.log(`listening on port ${PORT}`)
}



const setupServer = isClusterRequired => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
    console.log(`Node version: ${process.version}`);
    console.log(`listening on PORT ${PORT}`);
    // console.log('AUTH_URI:', AUTH_URI);
    // console.log('AUTH_PROJECT_NAME:', AUTH_PROJECT_NAME);
  } else {
    // to setup server configurations and share port address for incoming requests
    setUpExpress();
  }
};

setupServer(true);