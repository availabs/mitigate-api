var SevereWeatherService = require("../services/severeWeatherController"),
    metadata = require('./metadata'),
    hazards2severeWeather = metadata.hazards2severeWeather,
    severeWeather2hazards = metadata.severeWeather2hazards,
    hazards = metadata.hazards;

module.exports = [
	{ // SevereWeatherByGeoByYear
		route: `severeWeather[{keys:geoids}][{keys:hazardids}][{keys:years}]['num_events', 'property_damage', 'crop_damage', 'injuries', 'fatalities']`,
	    get: function (pathSet) {
    		const geoids = pathSet.geoids.map(d => d.toString()),
    			years = pathSet.years.map(d => +d),
    			hazardTypes = pathSet.hazardids.reduce((a, c) => a.concat(hazards2severeWeather[c]), []);

    		return SevereWeatherService.SevereWeatherByGeoByYear(this.db_service, years, geoids, hazardTypes)
    			.then(rows => {

//     				const pathKeys = pathSet[4],
//     					response = [];
//     				geoids.forEach(geoid => {
// 	    				years.forEach(year => {
// 	    					pathSet.hazardids.forEach(haz => {
// 		    					const hazardids = hazards2severeWeather[haz];
// 		    					let hazardData = rows.filter(d => d.year === year && d.geoid === geoid && hazardids.includes(d.hazard))
// 		    					pathKeys.forEach(key => {
// 		    						let totalHazard = hazardData.reduce((a, b) => a + +b[key], 0);
// 			    					response.push({
// 			    						path: ['severeWeather', geoid, haz, year, key],
// 			    						value: totalHazard 
// 			    					})
// 			    				})
// 		    				})
// 		    			})
// 	    			})
// console.timeEnd("PROCESS")
// 	    			return response;

					let DATA_MAP = {};
					const valueNames = pathSet[4];

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					pathSet.hazardids.forEach(hazardid => {
	    						valueNames.forEach(pk => {
									const path = ['severeWeather', geoid, hazardid, year, pk],
										pathKey = path.join("-");

									if (!(pathKey in DATA_MAP)) {
										DATA_MAP[pathKey] = {
											value: 0,
											path
										};
									}
								})
		    				})
		    			})
	    			})

					rows.forEach(row => {
						const hazardid = severeWeather2hazards[row.hazard];
						valueNames.forEach(pk => {
							const path = ['severeWeather', row.geoid, hazardid, row.year, pk],
								pathKey = path.join("-");
							let value = DATA_MAP[pathKey].value + (+row[pk]);
							DATA_MAP[pathKey].value = value;
						})
					})
					return Object.values(DATA_MAP);
	    		})
	    } // END get
	} // END SevereWeatherByGeoByYear
]