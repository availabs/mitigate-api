var Router = require("falcor-router"),
    RiskIndeService = require("../services/riskIndexController"),
    jsonGraph = require('falcor-json-graph'),
    $ref = jsonGraph.ref,
    $error = jsonGraph.error,
    $atom = jsonGraph.atom
    metadata = require('./metadata'),
    HAZARD_META = metadata.HAZARD_META,
    hazards = metadata.hazards;



module.exports = [
	{ // riskIndexHazards
		route: 'riskIndex.hazards',
	    get: function () {
	    	return {
	    		path: ['riskIndex', 'hazards'],
	    		value: $atom(
					[
						'wind',
					  	'wildfire',
						'tsunami',
						'tornado',
						'riverine',
						'lightning',
						'landslide',
						'icestorm',
						'hurricane',
						'heatwave',
						'hail',
						'earthquake',
						'drought',
						'avalanche',
						'coldwave',
						'winterweat',
						'volcano',
						'coastal'
					]
				)
			}
	    		
	    }
	}, // END riskIndexHazards
	{ // riskIndexMeta
		route: `riskIndex.meta[{keys:hazardIds}]['id', 'name', 'description']`,
	    get: function (pathSet) {
    		let response = [];
    		var pathKeys = pathSet[3]
    		pathSet.hazardIds.forEach(haz => {
    			pathKeys.forEach(key => {
    				response.push({
    					path: ['riskIndex', 'meta', haz, key],
    					value: HAZARD_META[haz][key]
    				})
    			})
    		})
    		return response
	    }
	}, // END riskIndexMeta
	{ // riskIndexByGeo
		route: `riskIndex[{keys:geoids}][{keys:hazardIds}]['value', 'score']`,
	    get: function (pathSet) {
	    	let response = [];
	    	var pathKeys = pathSet[3]; // why? look into this
	    	return new Promise((resolve, reject) => {
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		RiskIndeService.HazardsByGeoid(this.db_service, geoids).then(riskData => {
	    			riskData.forEach(row => {
		    			if(geoids.includes(row.geoid)) {
		    				pathSet.hazardIds.forEach(haz => {
		    					pathKeys.forEach(col => {
			    					response.push({
			    						path: ['riskIndex', row.geoid, haz, col],
			    						value: +(+row[`${haz}_${col}`]).toFixed(2)
			    					})
			    				})
		    				})
		    			}
		    		})
		    		resolve(response);
		    	})
		    })
	    }
	} // END riskIndexByGeo
]


//------ Unassigned Sheldus events 
//"Severe Storm/Thunder Storm"
//"Fog"
