const CENSUS_CONFIG = require('../services/utils/censusConfig.js')

const GeoService = require("../services/geoController"),
    jsonGraph = require('falcor-json-graph'),
    $ref = jsonGraph.ref,
    $error = jsonGraph.error,
    $atom = jsonGraph.atom
    metadata = require('./metadata'),
    HAZARD_META = metadata.HAZARD_META,
    hazards = metadata.hazards;

const {
	CENSUS_API_VARIABLE_NAMES
} = require("../services/utils/censusApiUtils")

const typeByGeoidLength =  {
	'2': 'state',
	'5': 'county',
	'10': 'cousub',
	'11': 'tract',
	'14': 'blockgroup'
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
			console.log('in func')
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


    { // BlockGroupsByGeoid
        route: `geo[{keys:geoids}].blockgroup`,
        get: function (pathSet) {
            let response = [];
            var pathKeys = pathSet[2]; // why? look into this
            return new Promise((resolve, reject) => {
                let geoids = pathSet.geoids.map(d => d.toString()) // for keys to string
            GeoService.ChildrenByGeoid(this.db_service, geoids, 'blockgroup').then(geodata => {
                geoids.forEach(geoid => {
                response.push({
                path: ['geo', geoid, 'blockgroup'],
                value: $atom(geodata[geoid])
            })
        })
            resolve(response);

        })
        })
        }
    },


     // END BlockGroupsByGeoid

	{ // CensusAcsByGeoidByYear
		route: `geo[{keys:geoids}][{keys:years}]['population', 'poverty', 'non_english_speaking', 'under_5', 'over_64', 'vulnerable', 'population_change', 'poverty_change', 'non_english_speaking_change', 'under_5_change', 'over_64_change', 'vulnerable_change']`,
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
					console.log(returnData)
					return returnData;
				})
		}
	} // END CensusAcsByGeoidByYear
	,
    { // CensusAcsByGeoidBykeys
        route: `acs[{keys:geoids}][{keys:years}][{keys:acsSources}]`,

        get: function(pathSet) {
        	//console.log('in geoid by key')
            const geoids = pathSet.geoids.map(d => +d),
            years = pathSet.years.map(d => +d);
			censusKeys = pathSet.acsSources;
			//console.log('pathkeys', geoids, years, censusKeys)
			console.time('census Query')
            return GeoService.CensusAcsByGeoidByYearByKey(this.db_service, geoids, years, censusKeys)
                .then(results => {
                	console.timeEnd('census Query')
                	console.time('census prepare')
					let returnData  =[]
					console.log(results.length)
					 pathSet.geoids.forEach(geoid => {
					     pathSet.years.forEach(year => {
					     	censusKeys.forEach(key => {
									 var path = ['acs', geoid, year,key];
									 result = results
										 .reduce((a, c) => (c.geoid == geoid) && (c.year == year) && (c.censvar == key)? c : a, null);
										 //console.log('result', result)
									 returnData.push({
										 value: result ? result['value'] : 0,
										 path
									})
									  
					 		})

					 	})
					 });
					//console.log('returnData',results.length)
					console.timeEnd('census prepare');
					return returnData;
				})
        }
    } // END CensusAcsByGeoidByKeys
	,
    { // CensusAcsByGeoidBykeys census config
        route: `acs.config`,

        get: function(pathSet) {
                return[
					{
						path: ['acs','config'],
						value: $atom(CENSUS_CONFIG)
					}
				]

        }
    } // END CensusAcsByGeoidByKeys

]//}