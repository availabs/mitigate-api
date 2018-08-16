const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	META_DATA = require("./metadata"),
	hazards2femadisasters = META_DATA.hazards2femadisasters,
	femadisasters2hazards = META_DATA.femadisasters2hazards,

	hmapController = require("../services/hmapController"),
	ATTRIBUTES = hmapController.ATTRIBUTES,
	COERCE = hmapController.COERCE;

const getPathSetVariables = pathSet => ({
	geoids: pathSet.geoids && pathSet.geoids.map(geoid => geoid.toString()),
	years: pathSet.years,
	indices: pathSet.indices,
	hazardids: pathSet.hazardids,
	incidentTypes: pathSet.hazardids.reduce((a, c) => a.concat(hazards2femadisasters[c]), [])
})

module.exports = [
	{ // hmapLengths
		route: `hmap[{keys:geoids}][{keys:hazardids}][{integers:years}].length`,
	    get: function (pathSet) {
	    	const {
	    		geoids,
	    		hazardids,
	    		years,
	    		incidentTypes
	    	} = getPathSetVariables(pathSet);

    		return hmapController.hmapLengths(this.db_service, geoids, incidentTypes, years)
    			.then(rows => {

					const DATA_MAP = {};

					geoids.forEach(geoid => {
						years.forEach(year => {
							hazardids.forEach(hazardid => {
								const path = ['hmap', geoid, hazardid, year, 'length'],
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
						const hazardid = femadisasters2hazards[row.incidenttype],
							path = ['hmap', row.geoid, hazardid, row.year, 'length'],
							pathKey = path.join("-"),
							value = DATA_MAP[pathKey].value + (+row.length);
						DATA_MAP[pathKey].value = value;
					})

					return Object.values(DATA_MAP);
	    		})
	    } // END get
	}, // END hmapLengths

	{ // hmapIndices
		route: 'hmap[{keys:geoids}][{keys:hazardids}][{integers:years}].byIndex[{integers:indices}].project_id',
		get: function(pathSet) {
    		const {
    			geoids,
    			incidentTypes,
    			years,
    			indices,
    			hazardids
    		} = getPathSetVariables(pathSet);

    		return hmapController.hmapIndices(this.db_service, geoids, incidentTypes, years)
    			.then(rows => {
    				const result = [];

    				geoids.forEach(geoid => {
    					hazardids.forEach(hazardid => {
    						const hazards = hazards2femadisasters[hazardid];
    						years.forEach(year => {
    							const filtered = rows.filter(row => (row.geoid == geoid) && hazards.includes(row.incidenttype) && (row.year == year));
								indices.forEach(index => {
									const row = filtered[index];
									if (!row) {
										result.push({
											path: ["hmap", geoid, hazardid, year, "byIndex", index],
											value: null
										})
									}
									else {
										result.push({
											path: ["hmap", geoid, hazardid, year, "byIndex", index, "project_id"],
											value: row.project_id
										})
									}
								})
    						})
    					})
    				})

    				return result;
    			})
		}
	}, // END hmapIndices

	{ // hmapEventsById
		route: `hmap.byId[{keys:project_ids}]['${ ATTRIBUTES.join("','") }']`,
		get: function(pathSet) {
			const project_ids = pathSet.project_ids,
				attributes = pathSet[3];

			return hmapController.hmapEventsById(this.db_service, project_ids)
				.then(rows => {
					const result = [];

					project_ids.forEach(project_id => {
						const row = rows.reduce((a, c) => (c.project_id == project_id) ? c : a, null);
						if (!row) {
							result.push({
								path: ["hmap", "byId", project_id],
								value: null
							})
						}
						else {
							attributes.forEach(attribute => {
								if (attribute == "hazardid") {
									result.push({
										path: ["hmap", "byId", project_id, attribute],
										value: femadisasters2hazards[row.incidenttype]
									})
								}
								else {
									result.push({
										path: ["hmap", "byId", project_id, attribute],
										value: COERCE[attribute](row[attribute])
									})
								}
							})
						}
					})

					return result;
				})
		}
	}, // END hmapEventsById

	{ // hmapYearsOfData
		route: `hmap.yearsOfData`,
		get: function(pathSet) {
			return hmapController.hmapYearsOfData(this.db_service)
				.then(rows =>
					({
						path: ['hmap', 'yearsOfData'],
						value: $atom(rows.map(r => +r.year))
					})
				)
		}
	} // END hmapYearsOfData

]