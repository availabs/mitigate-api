const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	countiesController = require("../services/countiesController"),
	ATTRIBUTES = countiesController.ATTRIBUTES,
	COERCE = countiesController.COERCE;

const getFips = pathSet => pathSet.fips.map(fip => fip.toString());

module.exports = [
	{
		route: `counties.byFips[{keys:fips}]['plan_expiration', 'plan_consultant', 'plan_url', 'plan_status']`,
		get: function(pathSet) {
			const fips = getFips(pathSet);
			return countiesController.byFips(this.db_service, fips)
				.then(rows => {
					const response = [];
					fips.forEach(fip => {
						const obj = rows.reduce((a, c) => c.fips === fip ? c : a, null);
						if (obj) {
							pathSet[3].forEach(attribute => {
								response.push({
									path: ['counties', 'byFips', fip, attribute],
									value: obj[attribute]
								})
							})
						}
						else {
							response.push({
								path: ['counties', 'byFips', fip],
								value: null
							})
						}
					})
					return response;
				});
		}
	},

	{
		route: `counties.capabilities[{keys:geoids}][{keys:descriptions}]`,
		get: function(pathSet) {
			const geoids = pathSet.geoids.map(geoid => geoid.toString()),
				descriptions = pathSet.descriptions;
			return countiesController.capabilities(this.db_service, geoids, descriptions)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						descriptions.forEach(desc => {
							const value = rows.reduce((a, c) => c.geoid === geoid && c.description === desc ? c.description : a, null);
							response.push({
								path: ['counties', 'capabilities', geoid, desc],
								value
							})
						})
					})
					return response;
				})
		}
	}
	
]