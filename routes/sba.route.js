const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	sbaController = require("../services/sbaController")
	ATTRIBUTES = sbaController.ATTRIBUTES,
	COERCE = sbaController.COERCE;

const getPathSetVariables = pathSet => ({
	geoids: pathSet.geoids && pathSet.geoids.map(geoid => geoid.toString()),
	years: pathSet.years,
	indices: pathSet.indices,
	hazardids: pathSet.hazardids,
	zip_codes: pathSet.zip_codes && pathSet.zip_codes.map(geoid => geoid.toString())
})

module.exports = [
	{ // sbaByGeoByYear
		route: `sba['business', 'home', 'all'][{keys:geoids}][{keys:hazardids}][{integers:years}]['total_loss', 'loan_total', 'num_loans']`,
	    get: function (pathSet) {
	    	const {
	    		geoids,
	    		hazardids,
	    		years
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaByGeoByYear(this.db_service, geoids, hazardids, years)
	    		.then(rows => {
					let DATA_MAP = {};

					pathSet[1].forEach(loan_type => {
	    				geoids.forEach(geoid => {
		    				hazardids.forEach(hazardid => {
		    					years.forEach(year => {
		    						pathSet[5].forEach(attribute => {
										const path = ['sba', loan_type, geoid, hazardid, year, attribute],
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
		    		})

					rows.forEach(row => {
						pathSet[1].forEach(loan_type => {
							pathSet[5].forEach(attribute => {
								const path = ['sba', loan_type, row.geoid, row.hazardid, row.year, attribute],
									pathKey = path.join("-");
								let value = 0;
								if ((loan_type == "home") && (row.loan_type == "home")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if ((loan_type == "business") && (row.loan_type == "business")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if (loan_type == "all") {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
							})
						})
					})

					return Object.values(DATA_MAP);
	    		})
	    }
	}, // END sbaByGeoByYear

	{ // sbaByZip
		route: `sba['business', 'home', 'all'].byZip[{keys:zip_codes}][{keys:hazardids}][{integers:years}]['total_loss', 'loan_total', 'num_loans']`,
		get: function(pathSet) {
	    	const {
	    		zip_codes,
	    		hazardids,
	    		years
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaByZip(this.db_service, zip_codes, hazardids, years)
	    		.then(rows => {
					let DATA_MAP = {};

					pathSet[1].forEach(loan_type => {
	    				zip_codes.forEach(zip_code => {
		    				hazardids.forEach(hazardid => {
		    					years.forEach(year => {
		    						pathSet[6].forEach(attribute => {
										const path = ['sba', loan_type, 'byZip', zip_code, hazardid, year, attribute],
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
		    		})

					rows.forEach(row => {
						pathSet[1].forEach(loan_type => {
							pathSet[6].forEach(attribute => {
								const path = ['sba', loan_type, 'byZip', row.zip_code, row.hazardid, row.year, attribute],
									pathKey = path.join("-");
								let value = 0;
								if ((loan_type == "home") && (row.loan_type == "home")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if ((loan_type == "business") && (row.loan_type == "business")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if (loan_type == "all") {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
							})
						})
					})
					return Object.values(DATA_MAP);
	    		})
		}
	}, // END sbaByZip

	{ // sbaByZipAllTime
		route: `sba['business', 'home', 'all'].byZip[{keys:zip_codes}][{keys:hazardids}].allTime['total_loss', 'loan_total', 'num_loans']`,
		get: function(pathSet) {
	    	const {
	    		zip_codes,
	    		hazardids,
	    		years
	    	} = getPathSetVariables(pathSet);
	    	return sbaController.sbaByZipAllTime(this.db_service, zip_codes, hazardids, years)
	    		.then(rows => {
					let DATA_MAP = {};

					pathSet[1].forEach(loan_type => {
	    				zip_codes.forEach(zip_code => {
		    				hazardids.forEach(hazardid => {
	    						pathSet[6].forEach(attribute => {
									const path = ['sba', loan_type, 'byZip', zip_code, hazardid, "allTime", attribute],
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
						pathSet[1].forEach(loan_type => {
							pathSet[6].forEach(attribute => {
								const path = ['sba', loan_type, 'byZip', row.zip_code, row.hazardid, "allTime", attribute],
									pathKey = path.join("-");
								let value = 0;
								if ((loan_type == "home") && (row.loan_type == "home")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if ((loan_type == "business") && (row.loan_type == "business")) {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
								else if (loan_type == "all") {
									value = DATA_MAP[pathKey].value + (+row[attribute]);
									DATA_MAP[pathKey].value = value;
								}
							})
						})
					})
					return Object.values(DATA_MAP);
	    		})
		}
	}, // END sbaByZipAllTime

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
											path: ["sba", "events", geoid, hazardid, year, "byIndex", index, "entry_id"],
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
		route: `sba.events.byId[{keys:entry_ids}]['${ ATTRIBUTES.join("', '")}']`,
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
							pathSet[4].forEach(attribute => {
								result.push({
									path: ["sba", "events", "byId", entry_id, attribute],
									value: COERCE[attribute](row[attribute])
								})
							})
						}
					})

					return result;
	    		})
	    }
	} // END sbaEventsByEntryId
]