const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	countiesController = require("../services/countiesController"),
	ATTRIBUTES = countiesController.ATTRIBUTES,
	COERCE = countiesController.COERCE;

const getFips = pathSet => pathSet.fips.map(fip => fip.toString());

module.exports = [
	{
		route: `counties.byFips[{keys:fips}]['plan_expiration', 'plan_consultant', 'plan_url']`,
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
	}
	
]