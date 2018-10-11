const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	SevereWeatherService = require("../services/severeWeatherController"),
    metadata = require('./metadata'),
    hazards2severeWeather = metadata.hazards2severeWeather,
    severeWeather2hazards = metadata.severeWeather2hazards,
    hazards = metadata.hazards;

const getPathSetVariables = pathSet => ({
	hazardTypes: pathSet.hazardids.reduce((a, c) => a.concat(hazards2severeWeather[c]), []),
	geoids: pathSet.geoids && pathSet.geoids.map(geoid => geoid.toString()),
	years: pathSet.years,
	indices: pathSet.indices,
	hazardids: pathSet.hazardids
})

module.exports = [

	{
		route: 'severeWeather[{keys:geoids}][{keys:hazardids}].tract_totals.total_damage',
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardids
    		} = getPathSetVariables(pathSet);
			return SevereWeatherService.tractTotals(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, null)
						if (row) {
							hazardids.forEach(hazardid => {
								response.push({
									path: ['severeWeather', geoid, hazardid, 'tract_totals', 'total_damage'],
									value: +row[hazardid]
								})
							})
						}
						else {
							response.push({
								path: ['severeWeather', geoid, hazardid, 'tract_totals'],
								value: null
							})
						}
					})
					return response;
				})
		}
	},

	{
		route: "severeWeather.highRisk[{keys:hazardids}]",
		get: function(pathSet) {
			const {
				hazardTypes,
				hazardids
			} = getPathSetVariables(pathSet);;
			return SevereWeatherService.highRisk(this.db_service, hazardTypes)
				.then(rows => {
					const DATA_MAP = {};

					rows.forEach(row => {
						const hazardid = severeWeather2hazards[row.hazard],
							geoid = row.geoid;
						if (!(hazardid in DATA_MAP)) {
							DATA_MAP[hazardid] = {};
						}
						if (!(geoid in DATA_MAP[hazardid])) {
							DATA_MAP[hazardid][geoid] = 0;
						}
						let value = DATA_MAP[hazardid][geoid];
						value += +row.annualized_damage;
						DATA_MAP[hazardid][geoid] = value;
					})

					const response = [];

					for (const hazardid in DATA_MAP) {
						const hazardData = [];
						for (const geoid in DATA_MAP[hazardid]) {
							hazardData.push({ geoid, annualized_damage: DATA_MAP[hazardid][geoid] });
						}
						hazardData.sort((a, b) => b.annualized_damage - a.annualized_damage);
						response.push({
							path: ["severeWeather", "highRisk", hazardid],
							value: $atom(hazardData.slice(0, 5))
						})
					}

					return response;
				})
		}
	},

	{ // severeWeatherAllTime
		route: "severeWeather[{keys:geoids}][{keys:hazardids}].allTime"+
			" ['num_events', 'num_episodes', 'num_severe_events', "+
			" 'total_damage', 'property_damage', 'crop_damage', "+
			" 'injuries', 'fatalities', 'annualized_damage', "+
			" 'annualized_num_events', 'annualized_num_severe_events', "+
			" 'daily_event_prob', 'daily_severe_event_prob'] ",
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardTypes,
    			hazardids
    		} = getPathSetVariables(pathSet);

    		return SevereWeatherService.severeWeatherAllTime(this.db_service, geoids, hazardTypes)
    			.then(rows => {
    				let DATA_MAP = {};
					const valueNames = pathSet[4];
					let result = []

    				geoids.forEach(geoid => {
    					hazardids.forEach(hazardid => {
    						let hazards = hazards2severeWeather[hazardid]
							let hdata = rows.filter(row => (row.geoid == geoid) && hazards.includes(row.hazard));
    						valueNames.forEach(valueName => {
								result.push({
									path: ['severeWeather', geoid, hazardid, "allTime", valueName],
									value: hdata.reduce((out, curr) => out += +curr[valueName], 0)
								})
							})
	    				})
	    			})

					// rows.forEach(row => {
					// 	console.log('row', row)
					// 	const hazardid = severeWeather2hazards[row.hazard];
					// 	console.log('hazardid', hazardid)
					// 	valueNames.forEach(valueName => {
					// 		const path = ['severeWeather', row.geoid, hazardid, "allTime", valueName],
					// 			pathKey = path.join("-");
					// 		let value = DATA_MAP[pathKey].value + (+row[valueName]);
					// 		DATA_MAP[pathKey].value = value;
					// 	})
					// })

					return result;
    			})
    	}
	}, // END severeWeatherAllTime

	{ // SevereWeatherByGeoByYear
		route: `severeWeather[{keys:geoids}][{keys:hazardids}][{integers:years}]['num_events', 'num_episodes', 'num_severe_events', 'total_damage', 'property_damage', 'crop_damage', 'injuries', 'fatalities']`,
	    get: function (pathSet) {
    		const {
    			geoids,
    			hazardTypes,
    			years,
    			hazardids
    		} = getPathSetVariables(pathSet);
    			return SevereWeatherService.SevereWeatherByGeoByYear(this.db_service, geoids, hazardTypes, years)
    			.then(rows => {
    				
					let result = [];
					const valueNames = pathSet[4];

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					hazardids.forEach(hazardid => {
	    						let hdata = rows.filter(row => {
									return (
										(row.geoid == geoid) 
										&& hazards2severeWeather[hazardid].includes(row.hazard)
										&& row.year == year
									)
								});
	    						valueNames.forEach(valueName => {
									result.push({
										path: ['severeWeather', geoid, hazardid, year, valueName],
										value: hdata.reduce((out, curr) => out += +curr[valueName], 0)
									})
								})
		    				})
		    			})
	    			})

					// rows.forEach(row => {
					// 	const hazardid = severeWeather2hazards[row.hazard];
					// 	valueNames.forEach(valueName => {
					// 		const path = ['severeWeather', row.geoid, hazardid, row.year, valueName],
					// 			pathKey = path.join("-");
					// 		let value = DATA_MAP[pathKey].value + (+row[valueName]);
					// 		DATA_MAP[pathKey].value = value;
					// 	})
					// })
					
					return result;
	    		})
	    } // END get
	}, // END SevereWeatherByGeoByYear,

	{ // SevereWeatherEventsLengthByGeoByYear
		route: 'severeWeather.events[{keys:geoids}][{keys:hazardids}][{integers:years}].length',
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardTypes,
    			years,
    			hazardids
    		} = getPathSetVariables(pathSet);

    		return SevereWeatherService.SevereWeatherEventsLengthByGeoByYear(this.db_service, geoids, hazardTypes, years)
    			.then(rows => {

					const DATA_MAP = {};

					geoids.forEach(geoid => {
						years.forEach(year => {
							hazardids.forEach(hazardid => {
								const path = ['severeWeather', 'events', geoid, hazardid, year, 'length'],
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

					rows.forEach(row => {
						const hazardid = severeWeather2hazards[row.hazard],
							path = ['severeWeather', 'events', row.geoid, hazardid, row.year, 'length'],
							pathKey = path.join("-");
						let value = DATA_MAP[pathKey].value + (+row.length);
						DATA_MAP[pathKey].value = value;
					})

					return Object.values(DATA_MAP);
	    		})
	    } // END get
	}, // END SevereWeatherEventsLengthByGeoByYear

	{ // SevereWeatherEventIds
		route: 'severeWeather.events[{keys:geoids}][{keys:hazardids}][{integers:years}].byIndex[{integers:indices}].event_id',
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardTypes,
    			years,
    			indices,
    			hazardids
    		} = getPathSetVariables(pathSet);

    		return SevereWeatherService.SevereWeatherEventIds(this.db_service, geoids, hazardTypes, years)
    			.then(rows => {
    				const result = [];

    				geoids.forEach(geoid => {
    					hazardids.forEach(hazardid => {
    						const hazards = hazards2severeWeather[hazardid];
    						years.forEach(year => {
    							const filtered = rows.filter(row => (row.geoid == geoid) && hazards.includes(row.hazard) && (row.year == year));
								indices.forEach(index => {
									const row = filtered[index];
									if (!row) {
										result.push({
											path: ["severeWeather", "events", geoid, hazardid, year, "byIndex", index],
											value: null
										})
									}
									else {
										result.push({
											path: ["severeWeather", "events", geoid, hazardid, year, "byIndex", index, "event_id"],
											value: row.event_id
										})
									}
								})
    						})
    					})
    				})

    				return result;
    			})
		}
	}, // END SevereWeatherEventIds

	{ // SevereWeatherEventsById
		route: `severeWeather.events.byId[{keys:event_ids}]['date', 'county', 'municipality', 'geoid', 'cousub_geoid', 'year', 'hazardid', 'property_damage', 'magnitude', 'episode_narrative', 'event_narrative', 'geom', 'event_id', 'episode_id', 'injuries', 'fatalities', 'crop_damage']`,
		get: function(pathSet) {
			const event_ids = pathSet.event_ids,
				attributes = pathSet[4];

			return SevereWeatherService.SevereWeatherEventsById(this.db_service, event_ids)
				.then(rows => {
					const result = [];

					event_ids.forEach(event_id => {
						const row = rows.reduce((a, c) => (c.event_id == event_id) ? c : a, null);
						if (!row) {
							result.push({
								path: ["severeWeather", "events", "byId", event_id],
								value: null
							})
						}
						else {
							attributes.forEach(attribute => {
								if (attribute == "hazardid") {
									result.push({
										path: ["severeWeather", "events", "byId", event_id, attribute],
										value: severeWeather2hazards[row[hazard]]
									})
								}
								else {
									result.push({
										path: ["severeWeather", "events", "byId", event_id, attribute],
										value: row[attribute]
									})
								}
							})
						}
					})

					return result;
				})
		}
	}, // END SevereWeatherEventsById
	{
		route: `severeWeather.events[{keys:geoids}][{keys:hazardids}].top['property_damage', 'crop_damage', 'total_damage']`,
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardids
    		} = getPathSetVariables(pathSet),
    		attributes = pathSet[5];
			return SevereWeatherService.top(this.db_service, geoids, hazardids, attributes)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						hazardids.forEach(hazardid => {
							attributes.forEach(att => {
								response.push({
									path: ['severeWeather', 'events', geoid, hazardid, 'top', att],
									value: $atom(rows.reduce((a, c) => c.geoid === geoid && c.hazardid === hazardid && c.att === att ? c.rows : a, []))
								})
							})
						})
					})
					return response;
				})
		}
	},

	{ // SevereWeatherEventsByGeoByYear
		route: `severeWeather.events.borked[{keys:geoids}][{keys:hazardids}][{integers:years}].property_damage`,
		get: function(pathSet) {
    		const {
    			geoids,
    			hazardTypes,
    			years,
    			hazardids
    		} = getPathSetVariables(pathSet);

    		return SevereWeatherService.SevereWeatherEventsByGeoByYear(this.db_service, geoids, hazardTypes, years)
    			.then(rows => {

					const response = [];

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					hazardids.forEach(hazardid => {
								const hazards = hazards2severeWeather[hazardid],
									filtered = rows.filter(row => (row.geoid == geoid) && hazards.includes(row.hazard) && (row.year == year));
	    						
								const path = ['severeWeather', 'events', 'borked', geoid, hazardid, year, 'property_damage'],
									data = filtered.map(d => ({ geoid, hazardid, year, property_damage: +d.property_damage, geom: d.geom }))
												.filter(d => Boolean(d.property_damage));
								
								response.push({
									value: $atom(data),
									path
								});
		    				})
		    			})
	    			})

					return response;
    			})
		} // END get
	} // END SevereWeatherEventsByGeoByYear
]