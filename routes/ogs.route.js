const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	ogsController = require("../services/ogsController"),
	ATTRIBUTES = ogsController.ATTRIBUTES,
	COERCE = ogsController.COERCE;

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `ogs.byGeoid[{keys:geoids}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			return ogsController.length(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['ogs', 'byGeoid', geoid, 'length'],
							value
						})
					})
					return response;
				});
		}
	},

	{
		route: `ogs.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				indices = pathSet.indices;
			return ogsController.byIndex(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const filtered = rows.filter(row => row.geoid === geoid);
						indices.forEach(index => {
							const row = filtered[index];
							if (row) {
								response.push({
									path: ['ogs', 'byGeoid', geoid, 'byIndex', index, 'id'],
									value: +row.id
								})
							}
							else {
								response.push({
									path: ['ogs', 'byGeoid', geoid, 'byIndex', index],
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
		route: `ogs.byId[{keys:ids}]['${ ATTRIBUTES.join(`','`) }']`,
		get: function(pathSet) {
			const ids = pathSet.ids,
				attributes = pathSet[3];
			return ogsController.byId(this.db_service, ids)
				.then(rows => {
					const response = [];
					ids.forEach(id => {
						const obj = rows.reduce((a, c) => +c.id === id ? c : a, null);
						if (obj) {
							attributes.forEach(attribute => {
								response.push({
									path: ['ogs', 'byId', id, attribute],
									value: COERCE[attribute](obj[attribute])
								})
							})
						}
						else {
							response.push({
								path: ['ogs', 'byId', id],
								value: null
							})
						}
					})
					return response;
				});
		}
	}
	
]