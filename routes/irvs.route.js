const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	irvsController = require("../services/irvsController"),
	ATTRIBUTES = irvsController.ATTRIBUTES,

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
	},
	{
		route: 'irvs.byParcel[{keys:parcelids}].length',
		get: function(pathSet) {
			const parcelids = pathSet.parcelids;
			return irvsController.byParcelLength(this.db_service, parcelids)
				.then(rows => {
					const response = [];
					parcelids.forEach(parcelid => {
						const value = rows.reduce((a, c) => c.parcelid === parcelid ? +c.length : a, 0);
						response.push({
							path: ['irvs', 'byParcel', parcelid, 'length'],
							value
						})
					})
					return response;
				})
		}
	},
	{
		route: 'irvs.byParcel[{keys:parcelids}].byIndex[{keys:indices}].buildingid',
		get: function(pathSet) {
			const parcelids = pathSet.parcelids,
				indices = pathSet.indices;
			return irvsController.byParcelByIndex(this.db_service, parcelids)
				.then(rows => {
					const response = [];
					parcelids.forEach(parcelid => {
						const filtered = rows.filter(row => row.parcelid === parcelid);
						indices.forEach(index => {
							const row = filtered[index];
							if (row) {
								response.push({
									path: ['irvs', 'byParcel', parcelid, 'byIndex', index, 'buildingid'],
									value: row.buildingid
								})
							}
							else {
								response.push({
									path: ['irvs', 'byParcel', parcelid, 'byIndex', index],
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
		route: `irvs.byGeoid[{keys:geoids}].length`,
		get: function(pathSet) {
			const geoids = pathSet.geoids.map(g => g.toString());
			return irvsController.byGeoidLength(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['irvs', 'byGeoid', geoid, 'length'],
							value
						})
					})
					return response;
				})
		}
	},
	{
		route: `irvs.byGeoid[{keys:geoids}].byIndex[{integers:indices}].buildingid`,
		get: function(pathSet) {
			const geoids = pathSet.geoids.map(g => g.toString()),
				indices = pathSet.indices;
			return irvsController.byGeoidByIndex(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const filtered = rows.filter(row => row.geoid === geoid);
						indices.forEach(index => {
							const row = filtered[index];
							if (row) {
								response.push({
									path: ['irvs', 'byGeoid', geoid, 'byIndex', index, 'buildingid'],
									value: row.buildingid
								})
							}
							else {
								response.push({
									path: ['irvs', 'byGeoid', geoid, 'byIndex', index],
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
		route: `irvs.byId[{keys:buildingids}]['${ ATTRIBUTES.join("','") }']`,
		get: function(pathSet) {
			const buildingids = pathSet.buildingids;
			return irvsController.byId(this.db_service, buildingids)
				.then(rows => {
					const response = [];
					buildingids.forEach(buildingid => {
						const row = rows.reduce((a, c) => c.buildingid == buildingid ? c : a, null);
						if (row) {
							pathSet[3].forEach(attribute => {
								response.push({
									path: ['irvs', 'byId', buildingid, attribute],
									value: $atom(row[attribute])
								})
							})
						}
						else {
							response.push({
								path: ['irvs', 'byId', buildingid],
								value: null
							})
						}
					})
					return response;
				})
		}
	}
]