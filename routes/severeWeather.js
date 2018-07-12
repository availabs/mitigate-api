var SevereWeatherService = require("../services/severeWeatherController"),
    metadata = require('./metadata'),
    hazards2severeWeather = metadata.hazards2severeWeather,
    severeWeather2hazards = metadata.severeWeather2hazards,
    hazards = metadata.hazards;

module.exports = {
	SevereWeatherByGeoByYear: {
		route: `severeweather[{keys:geoids}][{keys:hazardIds}][{keys:years}]['num_events','property_damage', 'crop_damage', 'injuries', 'fatalities']`,
	    get: function (pathSet) {
	    	return new Promise((resolve, reject) => {
	    		const response = [], 
	    		    geoids = pathSet.geoids.map(d => d.toString()),
	    			years = pathSet.years.map(d => +d),
	    			hazardTypes = pathSet.hazardIds.reduce((a, c) => a.concat(hazards2severeWeather[c]), []);

	    		SevereWeatherService.SevereWeatherByGeoByYear(this.db_service, years, geoids, hazardTypes)
	    			.then(rows => {
	    				// let DATA_MAP = {};
	    				const pathKeys = pathSet[4];
	    				geoids.forEach(geoid => {
		    				years.forEach(year => {
		    					pathSet.hazardIds.forEach(haz => {
			    					const hazardids = hazards2severeWeather[haz];
			    					let hazardData = rows.filter(d => d.year === year && d.geoid === geoid && hazardids.includes(d.hazard))
			    					pathKeys.forEach(key => {
			    						let totalHazard = hazardData.reduce((a,b) => { 
					    					a += +b[key];
					    					return +a
					    				},0)
				    					response.push({
				    						path: ['severeweather', geoid, haz, year, key],
				    						value: totalHazard 
				    					})
				    				})
			    				})
			    			})
		    			})
		    			resolve(response)
		    		})
		    })
	    } // END get
	} // END SevereWeatherByGeoByYear
}