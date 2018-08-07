const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	sbaController = require("../services/sbaController")
	attributes = sbaController.attributes;

const getPathSetVariables = pathSet => ({
	geoids: pathSet.geoids.map(geoid => geoid.toString()),
	years: pathSet.years,
	indices: pathSet.indices,
	hazardids: pathSet.hazardids
})

module.exports = [
	{ // sbaByGeoByYear
		route: `sba[{keys:geoids}][{keys:hazardids}][{integers:years}]['${ attributes.join("', '")}']`,
	    get: function (pathSet) {
	    	const {
	    		geoids,
	    		hazardids,
	    		years
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaByGeoByYear(this.db_service, geoids, hazardids, years)
	    		.then(rows => {
					let DATA_MAP = {};

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					hazardids.forEach(hazardid => {
	    						pathSet[4].forEach(attribute => {
									const path = ['sba', geoid, hazardid, year, attribute],
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
						pathSet[4].forEach(attribute => {
							const path = ['sba', row.geoid, row.hazardid, row.year, attribute],
								pathKey = path.join("-");
							let value = DATA_MAP[pathKey].value + (+row[attribute]);
							DATA_MAP[pathKey].value = value;
						})
					})

					return Object.values(DATA_MAP);
	    		})
	    }
	}, // END sbaByGeoByYear

	{ // sbaEventsLength
		route: `sba.events[{keys:geoids}][{keys:hazardids}][{integers:years}].length`,
	    get: function (pathSet) {
	    	const {
	    		geoids,
	    		hazardids,
	    		years
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaEventsLength(this.db_service, geoids, hazardids, years)
	    		.then(rows => {
					let DATA_MAP = {};

    				geoids.forEach(geoid => {
	    				years.forEach(year => {
	    					hazardids.forEach(hazardid => {
								const path = ['sba', 'events', geoid, hazardid, year, 'length'],
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
						const path = ['sba', 'events', row.geoid, row.hazardid, row.year, 'length'],
							pathKey = path.join("-");
						let value = DATA_MAP[pathKey].value + (+row.length);
						DATA_MAP[pathKey].value = value;
					})

					return Object.values(DATA_MAP);
	    		})
	    }
	}, // END sbaEventsLength

	{ // sbaEventsByIndex
		route: `sba.events[{keys:geoids}][{keys:hazardids}][{integers:years}].byIndex[{integers:indices}].entry_id`,
	    get: function (pathSet) {
	    	const {
	    		geoids,
	    		hazardids,
	    		years,
	    		indices
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaEventsByIndex(this.db_service, geoids, hazardids, years, indices)
	    		.then(rows => {
    				const result = [];

    				geoids.forEach(geoid => {
    					hazardids.forEach(hazardid => {
    						years.forEach(year => {
    							const filtered = rows.filter(row => (row.geoid == geoid) && (row.hazardid == hazardid) && (row.year == year));
								indices.forEach(index => {
									const row = filtered[index];
									if (!row) {
										result.push({
											path: ["sba", "events", geoid, hazardid, year, "byIndex", index],
											value: null
										})
									}
									else {
										result.push({
											path: ["severeWeather", "events", geoid, hazardid, year, "byIndex", index, "entry_id"],
											value: row.entry_id
										})
									}
								})
    						})
    					})
    				})

    				return result;
	    		})
	    }
	}, // END sbaEventsByIndex

	{ // sbaEventsByEntryId
		route: `sba.events.byId[{keys:entry_ids}]['${ attributes.join("', '")}']`,
	    get: function (pathSet) {
	    	const entry_ids = pathSet.entry_ids;
	    	return sbaController.sbaEventsByEntryId(this.db_service, entry_ids)
	    		.then(rows => {
					const result = [];

					entry_ids.forEach(entry_id => {
						const row = rows.reduce((a, c) => (c.entry_id == entry_id) ? c : a, null);
						if (!row) {
							result.push({
								path: ["sba", "events", "byId", entry_id],
								value: null
							})
						}
						else {
							pathSet[2].forEach(attribute => {
								result.push({
									path: ["sba", "events", "byId", entry_id, attribute],
									value: row[attribute]
								})
							})
						}
					})

					return result;
	    		})
	    }
	} // END sbaEventsByEntryId
]