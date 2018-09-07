var RiskIndexService = require("../services/riskIndexController"),
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
	    		value: $atom(hazards)
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
	    	let hazardIds = pathSet[2];
	    	var pathKeys = pathSet[3];
	    	
	    	return new Promise((resolve, reject) => {
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		RiskIndexService.HazardsByGeoid(this.db_service, geoids, hazardIds)
	    			.then(riskData => {
	    	
		    			// riskData.forEach(row => {
			    		// 	if(geoids.includes(row.geoid)) {
			    		// 		pathSet.hazardIds.forEach(haz => {
			    		// 			pathKeys.forEach(col => {
				    	// 				response.push({
				    	// 					path: ['riskIndex', row.geoid, haz, col],
				    	// 					value: +(+row[`${haz}_${col}`]).toFixed(2)
				    	// 				})
				    	// 			})
			    		// 		})
			    		// 	}
			    		// })
						geoids.forEach(geoid => {
							const row = riskData.reduce((a, c) => c.geoid === geoid ? c : a, null);
							pathSet[2].forEach(hazard => {
								if (!row) {
									response.push({
										path: ['riskIndex', geoid, hazard],
										value: null
									})
								}
								else {
									pathSet[3].forEach(attribute => {
										let value = row[`${ hazard }_${ attribute }`];
										if (value) {
											value = +(+value).toFixed(2);
										}
										response.push({
											path: ['riskIndex', geoid, hazard, attribute],
											value
										})
									})
								}
							})
						})
			    		resolve(response);
			    	})
		    })
	    }
	}, // END riskIndexByGeo

	{
		route: `riskIndex[{keys:geoids}]['nri','bric','sovi','sovist', 'builtenv']['score', 'value']`,
		get: function(pathSet) {
			const geoids = pathSet.geoids.map(d => d.toString());
			return RiskIndexService.riskIndexOthers(this.db_service, geoids)
				.then(rows => {
					const result = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, null);
						pathSet[2].forEach(other => {
							if (!row) {
								result.push({
									path: ['riskIndex', geoid, other],
									value: null
								})
							}
							else {
								pathSet[3].forEach(attribute => {
									result.push({
										path: ['riskIndex', geoid, other, attribute],
										value: row[other] ? +row[other] : null
									})
								})
							}
						})
					})
					return result;
				})
		}
	}
]


//------ Unassigned Sheldus events 
//"Severe Storm/Thunder Storm"
//"Fog"
