const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	contentController = require("../services/contentController")

module.exports = [
	{
		route: 'content.byIndex.length',
		get: function(pathSet) {
			return contentController.contentByIndexLength(this.db_service)
				.then(({ length }) => {
					return [
						{
							path: ['content', 'byIndex', 'length'],
							value: $atom(+length)
						}
					]
				});
		}
	},

	{
		route: `content.byIndex[{integers:indices}].content_id`,
		get: function(pathSet) {
			return contentController.contentByIndex(this.db_service)
				.then(rows => {
					const result = [];
					pathSet.indices.forEach(index => {
						const row = rows[index];
						if (!row) {
							result.push({
								path: ['content', 'byIndex', index],
								value: $atom(null)
							})
						}
						else {
							result.push({
								path: ['content', 'byIndex', index, 'content_id'],
								value: $atom(row['content_id'])
							})
						}
					})
					return result;
				});
		}
	},

	{
		route: `content.byId[{keys:content_ids}]['content_id', 'attributes', 'body', 'created_at', 'updated_at']`,
		get: function(pathSet) {
			return contentController.getContentById(this.db_service, pathSet.content_ids)
				.then(rows => {
					const result = [];
					pathSet.content_ids.forEach(content_id => {
						const row = rows.reduce((a, c) => c.content_id == content_id ? c : a, null);
						if (!row) {
							result.push({
								path: ['content', 'byId', content_id],
								value: $atom(null)
							})
						}
						else {
							pathSet[3].forEach(valueName => {
								result.push({
									path: ['content', 'byId', content_id, valueName],
									value: $atom(row[valueName])
								})
							})
						}
					})
					return result;
				})
		},
		set: function(jsonGraph) {
			const contentById = jsonGraph.content.byId,
				content_ids = Object.keys(contentById);
			return contentController.setContentById(this.db_service, contentById)
				.then(rows => {
					const result = [];
					content_ids.forEach(content_id => {
						const row = rows.reduce((a, c) => c.content_id == content_id ? c : a, null);
						if (!row) {
							result.push({
								path: ['content', 'byId', content_id],
								value: $atom(null)
							})
						}
						else {
							const new_content_id = ('content_id' in row) ? row.content_id : content_id;
							if (new_content_id != content_id) {
								result.push({
									path: ['content', 'byId', content_id],
									invalidated: true
								})
								result.push({
									path: ['content', 'byIndex'],
									invalidated: true
								})
								for (const key in row) {
									result.push({
										path: ['content', 'byId', new_content_id, key],
										value: $atom(row[key])
									})
								}
							}
							else {
								for (const key in row) {
									result.push({
										path: ['content', 'byId', content_id, key],
										value: $atom(row[key])
									})
								}
							}
						}
					})
					return result;
				});
		}
	},

	{
		route: 'content.insert',
		call: function(callPath, args, refPaths, thisPaths) {
			return contentController.contentInsert(this.db_service, args)
				.then(({ created_at, updated_at, length }) => {
					return [
						{
							path: ['content', 'byIndex'],
							invalidated: true
						},
						{
							path: ['content', 'byId', args[0], 'attributes'],
							value: $atom(args[1])
						},
						{
							path: ['content', 'byId', args[0], 'body'],
							value: $atom(args[2])
						},
						{
							path: ['content', 'byId', args[0], 'created_at'],
							value: $atom(created_at)
						},
						{
							path: ['content', 'byId', args[0], 'updated_at'],
							value: $atom(updated_at)
						}
					]
				})
		}
	},

	{
		route: 'content.byId.remove',
		call: function(callPath, args, refPaths, thisPaths) {
			return contentController.contentByIdRemove(this.db_service, args)
				.then(({ length }) => {
					return [
						{
							path: ['content', 'byIndex'],
							invalidated: true
						},
						{
							path: ['content', 'byId', args[0]],
							invalidated: true
						}
					]
				})
		}
	}
]