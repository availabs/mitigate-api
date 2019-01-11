const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	irvsController = require("../services/irvsController"),

	{ pprint } = require("../utils/utils");

module.exports = [
	{
		route: `irvs.meta[{keys:options}]['name', 'values']`,
		get: function(pathSet) {
			const options = pathSet.options,
				attributes = pathSet[3];
			return irvsController.getMeta(this.db_service, options)
				.then(rows => {
					const response = [];
					options.forEach(option => {
						const row = rows.reduce((a, c) => c.option === option ? c : a, null)
						if (row) {
							attributes.forEach(attribute => {
								response.push({
									path: ['irvs', 'meta', option, attribute],
									value: $atom(row[attribute])
								})
							})	
						}
						else {
							response.push({
								path: ['irvs', 'meta', option],
								value: null
							})
						}
					})
					return response;
				});
		}
	}
]