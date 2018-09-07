const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	capabilitiesController = require("../services/capabilitiesController"),
	ATTRIBUTES = capabilitiesController.ATTRIBUTES;

module.exports = [
	{
		route: 'capabilities.length',
		get: function(pathSet) {
			return capabilitiesController.length(this.db_service)
				.then(length => {
					return [
						{
							path: ['capabilities', 'length'],
							value: $atom(+length)
						}
					]
				});
		}
	},

	{
		route: `capabilities.byIndex[{integers:indices}].id`,
		get: function(pathSet) {
			return capabilitiesController.byIndex(this.db_service)
				.then(rows => {
					const result = [];
					pathSet.indices.forEach(index => {
						const row = rows[index];
						if (!row) {
							result.push({
								path: ['capabilities', 'byIndex', index],
								value: $atom(null)
							})
						}
						else {
							result.push({
								path: ['capabilities', 'byIndex', index, 'id'],
								value: $atom(row['id'])
							})
						}
					})
					return result;
				});
		}
	},

	{
		route: `capabilities.byId[{keys:ids}]['${ ATTRIBUTES.join("','") }']`,
		get: function(pathSet) {
			const IDs = pathSet.ids;
			return capabilitiesController.get(this.db_service, IDs)
				.then(rows => {
					const result = [];
					IDs.forEach(id => {
						const row = rows.reduce((a, c) => c.id == id ? c : a, null);
						if (!row) {
							result.push({
								path: ['capabilities', 'byId', id],
								value: $atom(null)
							})
						}
						else {
							pathSet[3].forEach(attribute => {
								result.push({
									path: ['capabilities', 'byId', id, attribute],
									value: $atom(row[attribute])
								})
							})
						}
					})
					return result;
				})
		},
		set: function(jsonGraph) {
			const capabilitiesById = jsonGraph.capabilities.byId,
				ids = Object.keys(capabilitiesById);
			return capabilitiesController.update(this.db_service, capabilitiesById)
				.then(rows => {
					const result = [];
					ids.forEach(id => {
						const row = rows.reduce((a, c) => c.id == id ? c : a, null);
						if (!row) {
							result.push({
								path: ['capabilities', 'byId', id],
								value: $atom(null)
							})
						}
						else {
							for (const key in row) {
								result.push({
									path: ['capabilities', 'byId', id, key],
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
		route: 'capabilities.insert',
		call: function(callPath, args, refPaths, thisPaths) {
			return capabilitiesController.insert(this.db_service, args)
				.then(([length, row]) => {
					return [
						{
							path: ['capabilities', 'length'],
							value: length
						},
						{
							path: ['capabilities', 'byIndex'],
							invalidated: true
						},
						...Object.keys(row).map(key => ({
							path: ['capabilities', 'byId', row.id, key],
							value: row[key]
						}))
					]
				})
		}
	},

	{
		route: 'capabilities.remove',
		call: function(callPath, args, refPaths, thisPaths) {
// console.log("<capabilities.remove>", args)
			return capabilitiesController.remove(this.db_service, args)
				.then(length => {
					const result = args.map(id => ({
						path: ['capabilities', 'byId', id],
						invalidated: true
					}))
					return [
						{
							path: ['capabilities', 'byIndex'],
							invalidated: true,
						},
						{
							path: ['capabilities', 'length'],
							value: length
						},
						...result
					]
				})
		}
	}
]