const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	parcelController = require("../services/parcelController"),
	ATTRIBUTES = parcelController.ATTRIBUTES;

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `parcel.byGeoid[{keys:geoids}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			console.time('getNumParcels')
			return parcelController.length(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['parcel', 'byGeoid', geoid, 'length'],
							value
						})
					})
					console.timeEnd('getNumParcels')
					return response;
				});
		}
	},
	{
		route: 'parcel.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id',
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				indices = pathSet.indices;
			console.time('get parcel ids')
			return parcelController.byIndex(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const reduced = rows.reduce((a, c) => c.geoid === geoid ? c : a, null);
						indices.forEach(index => {
							const value = reduced.ids[index];
							if (value) {
								response.push({
									path: ['parcel', 'byGeoid', geoid, 'byIndex', index, 'id'],
									value
								})
							}
							else {
								response.push({
									path: ['parcel', 'byGeoid', geoid, 'byIndex', index],
									value: null
								})
							}
						})
					})
					console.timeEnd('get parcel ids')
					return response;
				});
		}
	},
	{
		route: `parcel.byId[{keys:parcelids}]['${ ATTRIBUTES.join("','") }']`,
		get: function(pathSet) {
			const parcelids = pathSet.parcelids,
				attributes = pathSet[3];
			console.time('get parcel attributes')
			return parcelController.byId(this.db_service, parcelids, attributes)
				.then(rows => {
					const response = [];
					parcelids.forEach(id => {
						const obj = rows.reduce((a, c) => c.id == id ? c : a, null);
						if (obj) {
							attributes.forEach(attribute => {
								response.push({
									path: ['parcel', 'byId', id, attribute],
									value: obj[attribute]
								})
							})
						}
						else {
							response.push({
								path: ['parcel', 'byId', id],
								value: null
							})
						}
					})
					console.timeEnd('get parcel attributes')
					return response;
				});
		}
	}
]