var SheldusService = require("../services/sheldusController"),
    jsonGraph = require('falcor-json-graph'),
    $ref = jsonGraph.ref,
    $error = jsonGraph.error,
    $atom = jsonGraph.atom
    metadata = require('./metadata'),
    HAZARD_META = metadata.HAZARD_META
    hazards = metadata.hazards;



module.exports = [
	{ // SheldusByGeoByYear
		route: `sheldus[{keys:geoids}][{keys:hazardIds}][{keys:years}]['num_events','property_damage', 'crop_damage', 'injuries', 'fatalities']`,
	    get: function (pathSet) {
	    	let response = [];
	    	var pathKeys = pathSet[4]; // why? look into this
	    	return new Promise((resolve, reject) => {
	    		// force types
	    		let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
	    		let years = pathSet.years.map(d => +d)
	    		// console.log('1 - getting sheldus data')
	    		// console.time('sheldusService Time')
	    		SheldusService.SheldusByYearByGeoid(this.db_service, years, geoids).then(sheldusData => {
	    		//console.timeEnd('sheldusService Time')
    				// console.log('sheldusData', sheldusData.length)
    				// console.time('sheldus process time')
    				// console.log('2 - got sheldus data')
    				years.forEach(year => {
	    				geoids.forEach(geoid => {
	    					pathSet.hazardIds.forEach(haz => {
		    					sheldusHazkey = HAZARD_META[haz].sheldus
		    					let sheldusRow = sheldusData.filter(d => d.year === year && d.geoid === geoid && d.hazard === sheldusHazkey)[0]
		    					pathKeys.forEach(key => {
			    					response.push({
			    						path: ['sheldus', geoid, haz, year, key],
			    						value: sheldusRow ? +sheldusRow[key] : 0
			    					})
			    				})
		    				})
		    			})
	    			})
	    			//console.log('3 - sending sheldus data')
	    			//console.timeEnd('sheldus process time')
		    		resolve(response);
		    	})
		    })
	    }
	} // END SheldusByGeoByYear
]


//------ Unassigned Sheldus events 
//"Severe Storm/Thunder Storm"
//"Fog"
