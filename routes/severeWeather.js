var SevereWeatherService = require("../services/severeWeatherController"),
    metadata = require('./metadata'),
    hazards2severeWeather = metadata.hazards2severeWeather,
    severeWeather2hazards = metadata.severeWeather2hazards,
    hazards = metadata.hazards;

module.exports = {
	SevereWeatherByGeoByYear: {
		route: `severeweather[{keys:geoids}][{keys:hazardids}][{keys:years}]['num_events','property_damage', 'crop_damage', 'injuries', 'fatalities']`,
	    get: function (pathSet) {
	    	return new Promise((resolve, reject) => {
	    		const geoids = pathSet.geoids.map(d => d.toString()),
	    			years = pathSet.years.map(d => +d),
	    			hazardTypes = pathSet.hazardids.reduce((a, c) => a.concat(hazards2severeWeather[c]), []);

	    		SevereWeatherService.SevereWeatherByGeoByYear(this.db_service, years, geoids, hazardTypes)
	    			.then(rows => {
	    				let DATA_MAP = {};

	    				const valueNames = pathSet[4];

	    				rows.forEach(row => {
	    					const hazardid = severeWeather2hazards[row.hazard];
    						valueNames.forEach(pk => {
	    						const path = ['severeweather', row.geoid, hazardid, row.year, pk],
	    							pathKey = path.join("-");

		    					if (!(pathKey in DATA_MAP)) {
		    						DATA_MAP[pathKey] = {
		    							value: 0,
		    							path
		    						};
		    					}
								let value = +DATA_MAP[pathKey].value;
								value += +row[pk];
		    					DATA_MAP[pathKey].value = value;
    						})
	    				})
		    			resolve(Object.values(DATA_MAP));
		    		})
		    })
	    } // END get
	} // END SevereWeatherByGeoByYear
}