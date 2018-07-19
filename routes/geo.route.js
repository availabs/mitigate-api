var Router = require("falcor-router"),
    GeoService = require("../services/geoController"),
    jsonGraph = require('falcor-json-graph'),
    $ref = jsonGraph.ref,
    $error = jsonGraph.error,
    $atom = jsonGraph.atom
    metadata = require('./metadata'),
    HAZARD_META = metadata.HAZARD_META
    hazards = metadata.hazards;

const typeByGeoidLength =  {
	'2': 'state',
	'5': 'county',
	'10': 'cousub',
	'11': 'tract'
}

module.exports = [//{
	{ // GeoByGeoid
		route: `geo[{keys:geoids}]['geoid', 'name', 'type']`,
	    get: function (pathSet) {
	    	let response = [];
	    	var pathKeys = pathSet[2]; // why? look into this
	    	return new Promise((resolve, reject) => {
	    		// force types
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		GeoService.GeoByGeoid(this.db_service, geoids).then(geodata => {
    				// console.log('sheldusData', sheldusData.length)
    				geodata.forEach(row => {
    					pathKeys.forEach(key => {
	    					response.push({
	    						path: ['geo', row.geoid, key],
	    						value: key === 'type' 
	    							? typeByGeoidLength[row.geoid.length] 
	    							: row[key]
	    					})
	    				})
		    			
	    			})
		    		resolve(response);
		    	})
		    })
	    }
	}, // END GeoByGeoid

	{ // CountiesByGeoid
		route: `geo[{keys:geoids}].counties`,
	    get: function (pathSet) {
	    	let response = [];
	    	return new Promise((resolve, reject) => {
	    		// force types
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		GeoService.ChildrenByGeoid(this.db_service, geoids, 'county').then(geodata => {
    				geoids.forEach(geoid => {	
    					response.push({
    						path: ['geo',geoid, 'counties'],
    						value: $atom(geodata[geoid])
    					})
	    			})
		    		resolve(response);
		    	})
		    })
	    }
	}, // END CountiesByGeoid

	{ // TractsByGeoid
		route: `geo[{keys:geoids}].tracts`,
	    get: function (pathSet) {
	    	let response = [];
	    	var pathKeys = pathSet[2]; // why? look into this
	    	return new Promise((resolve, reject) => {
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		GeoService.ChildrenByGeoid(this.db_service, geoids, 'tract').then(geodata => {
    				geoids.forEach(geoid => {	
    					response.push({
    						path: ['geo', geoid, 'tracts'],
    						value: $atom(geodata[geoid])
    					})
	    			})
		    		resolve(response);
		    	})
		    })
	    }
	}, // END TractsByGeoid

	{ // CousubsByGeoid
		route: `geo[{keys:geoids}].cousubs`,
	    get: function (pathSet) {
	    	let response = [];
	    	var pathKeys = pathSet[2]; // why? look into this
	    	return new Promise((resolve, reject) => {
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		GeoService.ChildrenByGeoid(this.db_service, geoids, 'cousub').then(geodata => {
    				geoids.forEach(geoid => {	
    					response.push({
    						path: ['geo', geoid, 'cousubs'],
    						value: $atom(geodata[geoid])
    					})
	    			})
		    		resolve(response);
		    	})
		    })
	    }
	}, // END CousubsByGeoid

	{ // CensusAcsByGeoidByYear
		route: `geo[{keys:geoids}][{keys:years}]['population', 'under_5']`,
		get: function(pathSet) {
			const geoids = pathSet.geoids.map(d => d.toString()),
				years = pathSet.years.map(d => +d);
			return GeoService.CensusAcsByGeoidByYear(this.db_service, geoids, years)
				.then(results => {
					const valueNames = pathSet[3];

					let returnData = [];

					pathSet.geoids.forEach(geoid => {
						pathSet.years.forEach(year => {
							valueNames.forEach(vn => {
								const path = ['geo', geoid, year, vn],
									result = results.reduce((a, c) => (c.geoid == geoid) && (c.year == year) ? c : a, null);
								returnData.push({
									value: result ? +result[vn] : 0,
									path
								})
							})
						})
					})
					return returnData;
				})
		}
	} // END CensusAcsByGeoidByYear
]//}