const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	buildingController = require("../services/buildingController"),
	ATTRIBUTES = buildingController.ATTRIBUTES;

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `building.byGeoid[{keys:geoids}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			console.time('getNumbuildings')
			return buildingController.length(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['building', 'byGeoid', geoid, 'length'],
							value
						})
					})
					console.timeEnd('getNumbuildings')
					return response;
				});
		}
	},
	{
		route: `building.byGeoid[{keys:geoids}].owner[{keys:buildingOwners}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			const buildingOwners = pathSet[4]
			console.time('getNumbuildings')
			return buildingController.length(this.db_service, geoids, buildingOwners)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['building', 'byGeoid', geoid,'owner','length'],
							value
						})
					})
					console.timeEnd('getNumbuildings')
					return response;
				});
		}
	},

	{
		route: `building.byGeoid[{keys:geoids}].owner[{keys:buildingOwners}].sum['count','replacement_value']`,
		get: function (pathSet) {
			const geoids = getGeoids(pathSet);
			const buildingOwners = pathSet[4];
			const pathKeys = pathSet[6]
			return buildingController.buildingOwnerByTypeByValue(this.db_service, geoids, buildingOwners)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						buildingOwners.forEach((owner) => {
							rows.forEach((row) => {
								if (owner.toString() === row.owner_type) {
									pathKeys.forEach((keys) => {
										if (keys === 'count') {
											response.push({
												path: ['building', 'byGeoid', geoid, 'owner', owner, 'sum', [keys]],
												value: row[keys]
											})
										}
										else{
											response.push({
												path: ['building', 'byGeoid', geoid, 'owner', owner, 'sum', [keys]],
												value: row[keys]
											})
										}
									})
								}
							});

						})
					});
					console.timeEnd('getNumbuildings')
					return response;
				})
		}
	},

	/*
	//console.log('reduced',reduced)
						/*
						buildingOwners.forEach(owner => {
							pathKeys.forEach(key =>{
								const value = reduced.total_buildings;
								if (value) {
									if(key === 'count')
									response.push({
										path: ['building', 'byGeoid', geoid, 'owner',owner,'sum',['count']],
										value : value
									})
								}
								else {
									response.push({
										path: ['building', 'byGeoid', geoid, 'owner',owner,'sum'],
										value: null
									})
								}
							})

						})

	 */
/*

	{
		route: `building.byGeoid[{keys:geoids}].propType[{keys:propTypes}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			console.time('getNumbuildings')
			return buildingController.length(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['building', 'byGeoid', geoid, 'length'],
							value
						})
					})
					console.timeEnd('getNumbuildings')
					return response;
				});
		}
	},
 */
	{
		route: 'building.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id',
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				indices = pathSet.indices;
			console.time('get building ids')
			return buildingController.byIndex(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const reduced = rows.reduce((a, c) => c.geoid === geoid ? c : a, null);
						indices.forEach(index => {
							const value = reduced.ids[index];
							if (value) {
								response.push({
									path: ['building', 'byGeoid', geoid, 'byIndex', index, 'id'],
									value : $atom(value)
								})
							}
							else {
								response.push({
									path: ['building', 'byGeoid', geoid, 'byIndex', index],
									value: null
								})
							}
						})
					})
					console.timeEnd('get building ids')
					return response;
				});
		}
	},
	{
		route: `building.byId[{keys:buildingids}]['${ ATTRIBUTES.join("','") }']`,
		get: function(pathSet) {
			const buildingids = pathSet.buildingids,
				attributes = pathSet[3];
			console.time('get building attributes')
			return buildingController.byId(this.db_service, buildingids, attributes)
				.then(rows => {
					// console.log('building rows', rows, '\n')
					const response = [];
					buildingids.forEach(id => {
						const obj = rows.reduce((a, c) => c.id == id ? c : a, null);
						if (obj) {
							attributes.forEach(attribute => {
								// console.log('test', id, attribute, obj, obj[attribute])
								response.push({
									path: ['building', 'byId', id, attribute],
									value: obj[attribute]
								})
							})
						}
						else {
							response.push({
								path: ['building', 'byId', id],
								value: null
							})
						}
					})
					console.timeEnd('get building attributes')
					return response;
				});
		}
	}
]