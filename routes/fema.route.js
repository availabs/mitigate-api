const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	femaController = require("../services/femaController"),
	DISASTER_ATTRIUBUTES = femaController.DISASTER_ATTRIUBUTES,

	META_DATA = require("./metadata"),
	hazards2femadisasters = META_DATA.hazards2femadisasters,
	femadisasters2hazards = META_DATA.femadisasters2hazards;

const getDisasters = hazardids =>
	hazardids.reduce((a, c) => a.concat(hazards2femadisasters[c]), [])

module.exports = [
	{
		route: `femaDisaster[{keys:geoids}][{keys:hazardids}][{integers:years}].length`,
		get: function(pathSet) {
			const disasters = getDisasters(pathSet.hazardids);
			return femaController.femadisasterLengths(this.db_service, pathSet.geoids, disasters, pathSet.years)
				.then(rows => {
					const result = [];
					pathSet.geoids.forEach(geoid => {
						pathSet.hazardids.forEach(hazardid => {
							const disasters = hazards2femadisasters[hazardid];
							pathSet.years.forEach(year => {
								const filtered = rows.filter(row => (row.geoid == geoid) && disasters.includes(row.disaster) && (row.year == year));
								result.push({
									path: ["femaDisaster", geoid, hazardid, year, "length"],
									value: filtered.reduce((a, c) => a + +c.length, 0)
								})
							})
						})
					})
					return result;
				});
		}
	},

	{
		route: `femaDisaster[{keys:geoids}][{keys:hazardids}][{integers:years}][{integers:indices}].disasternumber`,
		get: function(pathSet) {
			const disasters = getDisasters(pathSet.hazardids);
			return femaController.femadisasterDisasterNumbers(this.db_service, pathSet.geoids, disasters, pathSet.years, pathSet.indices)
				.then(rows => {
					const result = [];
					pathSet.geoids.forEach(geoid => {
						pathSet.hazardids.forEach(hazardid => {
							const disasters = hazards2femadisasters[hazardid];
							pathSet.years.forEach(year => {
								const filtered = rows.filter(row => (row.geoid == geoid) && disasters.includes(row.disaster) && (row.year == year));
								pathSet.indices.forEach(index => {
									const row = filtered[index];
									if (!row) {
										result.push({
											path: ["femaDisaster", geoid, hazardid, year, index],
											value: null
										})
									}
									else {
										result.push({
											path: ["femaDisaster", geoid, hazardid, year, index, "disasternumber"],
											value: row.disasternumber
										})
									}
								})
							})
						})
					})
					return result;
				});
		}
	},

	{
		route: `femaDisaster.byDisasterNumber[{integers:disasternumbers}]['${ DISASTER_ATTRIUBUTES.join("','") }']`,
		get: function(pathSet) {
			return femaController.femadisasterByDisasterNumber(this.db_service, pathSet.disasternumbers)
				.then(rows => {
					const result = [];
					pathSet.disasternumbers.forEach(disasternumber => {
						const row = rows.reduce((a, c) => c.disasternumber == disasternumber ? c : a, null);
						if (!row) {
							result.push({
								path: ["femaDisaster", "byDisasterNumber", disasternumber],
								value: null
							})
						}
						else {
							pathSet[3].forEach(attribute => {
								if (attribute === 'hazard') {
									result.push({
										path: ["femaDisaster", "byDisasterNumber", disasternumber, attribute],
										value: femadisasters2hazards[row.disaster]
									})
								}
								else {
									result.push({
										path: ["femaDisaster", "byDisasterNumber", disasternumber, attribute],
										value: row[attribute]
									})
								}
							})
						}
					})
					return result;
				})
		}
	}
]