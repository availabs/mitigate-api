const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	criticalController = require("../services/criticalController")
	ATTRIBUTES = criticalController.ATTRIBUTES,
	COERCE = criticalController.COERCE;

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `critical.byGeoid[{keys:geoids}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			return criticalController.critLength(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['critical', 'byGeoid', geoid, 'length'],
							value
						})
					})
					return response;
				});
		}
	},

	{
		route: `critical.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				indices = pathSet.indices;
			return criticalController.critIndices(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const filtered = rows.filter(row => row.geoid === geoid);
						indices.forEach(index => {
							const row = filtered[index];
							if (row) {
								response.push({
									path: ['critical', 'byGeoid', geoid, 'byIndex', index, 'id'],
									value: row.id
								})
							}
							else {
								response.push({
									path: ['critical', 'byGeoid', geoid, 'byIndex', index],
									value: null
								})
							}
						})
					})
					return response;
				});
		}
	},

	{
		route: `critical.byId[{keys:ids}]['${ ATTRIBUTES.join(`','`) }']`,
		get: function(pathSet) {
			const ids = pathSet.ids
				attributes = pathSet[3];
			return criticalController.critById(this.db_service, ids)
				.then(rows => {
					const response = [];
					ids.forEach(id => {
						const obj = rows.reduce((a, c) => c.id === id ? c : a, null);
						if (obj) {
							attributes.forEach(attribute => {
								if (attribute === "address") {
									const address = [obj.address, obj.city, obj.state, obj.zip]
											.filter(d => Boolean(d))
											.join(", ");
									response.push({
										path: ['critical', 'byId', id, attribute],
										value: address
									})
								}
								else {
									response.push({
										path: ['critical', 'byId', id, attribute],
										value: obj[attribute]
									})
								}
							})
						}
						else {
							response.push({
								path: ['critical', 'byId', id],
								value: null
							})
						}
					})
					return response;
				});
		}
	},

	// {
	// 	route: `critical.byType[{keys:types}].count`,
	// 	get: function(pathSet) {
	// 		const types = pathSet.types;
	// 		return criticalController.typeCounts(this.db_service)
	// 			.then(rows => {
	// 				const response = [];
	// 				types.forEach(type => {
	// 					response.push({
	// 						path: ['critical', 'byType', type, 'count'],
	// 						value: rows.reduce((a, c) c.type == type ? +c.count : a, 0)
	// 					})
	// 				})
	// 				return response;
	// 			})
	// 	}
	// }
]