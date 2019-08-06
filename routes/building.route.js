const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	buildingController = require("../services/buildingController"),
	ATTRIBUTES = buildingController.ATTRIBUTES,
	META_DATA = require("./metadata"),
	hazardRisks = META_DATA.RISK_ZONES

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
												value: $atom(row[keys])
											})
										}
										else{
											response.push({
												path: ['building', 'byGeoid', geoid, 'owner', owner, 'sum', [keys]],
												value: $atom(row[keys])
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


	{
		route: `building.byGeoid[{keys:geoids}].propType[{keys:propType}].length`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet);
			const propType = pathSet[4];
			console.time('getNumbuildings')
			return buildingController.length(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const value = rows.reduce((a, c) => c.geoid === geoid ? +c.length : a, 0);
						response.push({
							path: ['building', 'byGeoid', geoid,'propType','length'],
							value
						})
					})
					console.timeEnd('getNumbuildings');
					return response;
				});
		}
	},

	{
		route: `building.byGeoid[{keys:geoids}].propType[{keys:propType}].sum['count','replacement_value']`,
		get: function (pathSet) {
			const geoids = getGeoids(pathSet);
			const propType = pathSet[4];
			const pathKeys = pathSet[6];
			return buildingController.buildingByLandUseType(this.db_service, geoids,propType)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						//propType.forEach((prop) => {
						rows.forEach((row) => {
							//if (row.prop_class.includes(prop.toString().replace(/^0+|0+$/g, ""))) {
							pathKeys.map((keys) => {
								if (keys === 'count') {
									response.push({
										path: ['building', 'byGeoid', geoid, 'propType',row.prop_class, 'sum', [keys]],
										value: $atom(row[keys])
									});
								}
								else{
									response.push({
										path: ['building', 'byGeoid', geoid, 'propType',row.prop_class, 'sum', [keys]],
										value: $atom(row[keys])
									})
								}
							})
							//}
						});
						//})
					});
					console.timeEnd('getNumbuildings')
					return response;
				})
		}
	},


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
									path: ['building', 'byGeoid', geoid, 'byIndex', index,'id'],
									value: null
								})
							}
						})
					});
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
		},
		set: function(jsonGraph) {
			const buildingsById = jsonGraph.building.byId,
				ids = Object.keys(buildingsById);
			return buildingController.update(this.db_service,buildingsById)
				.then(rows => {
					const result = [];
					ids.forEach(id => {
						const row = rows.reduce((a, c) => c.building_id === id ? c : a, null);
						if (!row) {
							result.push({
								path: ['building','byId', id],
								value: $atom(null)
							})
						}
						else {
							for (const key in row) {
								//console.log('key',key)
								result.push({
									path: ['building','byId', id, key],
									value: $atom(row[key])
								})
							}
						}
					})
					return result;
				});
		}
	},
	{
		route: `building.byGeoid[{keys:geoids}].hazardRisk[{keys:hazardKeys}].zones[{keys:zoneKeys}].sum['count','replacement_value']`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				hazardRisk = pathSet[4].toString(),
				zones = pathSet[6],
				pathKeys  = pathSet[8];
			return buildingController.summary(this.db_service,geoids,hazardRisk,zones)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						rows.forEach((row) => {
							zones.forEach((zone) =>{
								if(row[hazardRisk] === zone){
									pathKeys.forEach(key =>{
										if(key === 'count'){
											let path  = ['building','byGeoid',geoid,'hazardRisk',hazardRisk,'zones',zone,'sum',key]
											response.push({
												path : path,
												value : row[hazardRisk] === zone ? row[key] : 0
											});
										}
										if(key === 'replacement_value'){
											let path  = ['building','byGeoid',geoid,'hazardRisk',hazardRisk,'zones',zone,'sum',key]
											response.push({
												path : path,
												value : row[hazardRisk] === zone ? row[key] : 0
											})
										}
									})

								}
							})

						});
					});
					return response;
				});
		}
	},
	{ // hazard meta
		route: `building.hazard.meta.risk_zones`,
		get: function(pathSet) {
			return[
				{
					path: ['building','hazard','meta','risk_zones'],
					value: $atom(hazardRisks)
				}
			]

		}
	}
]