const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	nfipController = require("../services/nfipController"),

	{ pprint } = require("../utils/utils");

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `nfip.byGeoid[{keys:geoids}].allTime['num_losses', 'total_loss', 'building_loss', 'contents_loss']`,
		get: function(pathSet) {
console.log("????????????")
			const geoids = getGeoids(pathSet),
				attributes = pathSet[4];
			return nfipController.byGeoidAllTime(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, {});
						attributes.forEach(attribute => {
							response.push({
								path: ['nfip', 'byGeoid', geoid, 'allTime', attribute],
								value: +row[attribute] || 0
							})
						})
					})
					return response;
				});
		}
	},
	
]