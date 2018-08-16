const Router = require('../utils/falcor-router')
//require("@graphistry/falcor-router");

const fs = require("fs");

const regex = /^\w+.route.js$/;

const routes = fs.readdirSync("./routes")
    .filter(file => regex.test(file))
    .reduce((routes, file) => routes.concat(require(`./${ file }`)), []);

var BaseRouter = Router.createClass(routes);

// Creating a constructor for a class that derives from BaseRouter
var MitigationRouter = function(db_service) {
    BaseRouter.call(this, { maxPaths: 200000 });
    this.db_service = db_service;
    // this.userId = userId;
};

// Deriving the Mitigation from the BaseRouter using JavaScript's classical inheritance pattern
MitigationRouter.prototype = Object.create(BaseRouter.prototype);

module.exports = function(db_service) {
    return new MitigationRouter(db_service);
};