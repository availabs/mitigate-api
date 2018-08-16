const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	SevereWeatherService = require("../services/severeWeatherController"),
    metadata = require('./metadata'),
    hazards2severeWeather = metadata.hazards2severeWeather,
    severeWeather2hazards = metadata.severeWeather2hazards,
    hazards = metadata.hazards;

const getPathSetVariables = pathSet => ({
	hazardTypes: pathSet.hazardids.reduce((a, c) => a.concat(hazards2severeWeather[c]), []),
	geoids: pathSet.geoids.map(geoid => geoid.toString()),
	years: pathSet.years,
	indices: pathSet.indices,
	hazardids: pathSet.hazardids
})

module.exports = [
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

    				geoids.forEach(geoid => {
    					hazardids.forEach(hazardid => {
    						valueNames.forEach(valueName => {
								const path = ['severeWeather', geoid, hazardid, "allTime", valueName],
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
						const hazardid = severeWeather2hazards[row.hazard];
						valueNames.forEach(valueName => {
							const path = ['severeWeather', row.geoid, hazardid, "allTime", valueName],
								pathKey = path.join("-");
							let value = DATA_MAP[pathKey].value + (+row[valueName]);
							DATA_MAP[pathKey].value = value;
						})
					})

					return Object.values(DATA_MAP);
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

					let DATA_MAP = {};
					const valueNames = pathSet[4];

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					hazardids.forEach(hazardid => {
	    						valueNames.forEach(valueName => {
									const path = ['severeWeather', geoid, hazardid, year, valueName],
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
						valueNames.forEach(valueName => {
							const path = ['severeWeather', row.geoid, hazardid, row.year, valueName],
								pathKey = path.join("-");
							let value = DATA_MAP[pathKey].value + (+row[valueName]);
							DATA_MAP[pathKey].value = value;
						})
					})

					return Object.values(DATA_MAP);
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
		route: `severeWeather.events.byId[{keys:event_ids}]['geoid', 'cousub_geoid', 'year', 'hazardid', 'property_damage', 'magnitude', 'episode_narrative', 'event_narrative', 'geom', 'event_id', 'episode_id', 'injuries', 'fatalities', 'crop_damage']`,
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