const Router = require("falcor-router"),
    riskIndex = require('./riskIndex'),
    sheldus = require('./sheldus')
    geo = require('./geo');

var routes = [

    // Risk Index
    riskIndex.riskIndexHazards,
    riskIndex.riskIndexByGeo,
    riskIndex.riskIndexMeta,

    //sheldus
    sheldus.SheldusByGeoByYear,

    //geo
    geo.GeoByGeoid,
    geo.CountiesByGeoid,
    geo.TractsByGeoid
];

var BaseRouter = Router.createClass(routes, { maxPaths: 20000 });

// Creating a constructor for a class that derives from BaseRouter
var MitigationRouter = function(db_service){
    BaseRouter.call(this, { maxPaths: 20000 });
    this.db_service = db_service;
    // this.userId = userId;
};

// Deriving the Mitigation from the BaseRouter using JavaScript's classical inheritance pattern
MitigationRouter.prototype = Object.create(BaseRouter.prototype);

module.exports = function(db_service) {
    return new MitigationRouter(db_service);
};