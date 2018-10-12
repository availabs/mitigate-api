const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	commentsController = require("../services/commentsController")

module.exports = [

	{
		route: 'comments.byIndex.length',
		get: function(pathSet) {
			return commentsController.length(this.db_service)
				.then(value => {
					return [
						{
							path: ['comments', 'byIndex', 'length'],
							value
						}
					]
				});
		}
	},

	{
		route: `comments.byIndex[{integers:indices}].id`,
		get: function(pathSet) {
			return commentsController.commentIds(this.db_service)
				.then(rows => {
					const result = [];
					pathSet.indices.forEach(index => {
						const row = rows[index];
						if (!row) {
							result.push({
								path: ['comments', 'byIndex', index],
								value: null
							})
						}
						else {
							result.push({
								path: ['comments', 'byIndex', index, 'id'],
								value: row['id']
							})
						}
					})
					return result;
				});
		}
	},

	{
		route: `comments.byId[{keys:ids}]['name', 'email', 'comment', 'id', 'created_at']`,
		get: function(pathSet) {
			return commentsController.commentsById(this.db_service, pathSet.ids)
				.then(rows => {
					const result = [];
					pathSet.ids.forEach(id => {
						const row = rows.reduce((a, c) => c.id == id ? c : a, null);
						if (!row) {
							result.push({
								path: ['comments', 'byId', id],
								value: null
							})
						}
						else {
							pathSet[3].forEach(attribute => {
								result.push({
									path: ['comments', 'byId', id, attribute],
									value: row[attribute]
								})
							})
						}
					})
					return result;
				})
		}
	},

	{
		route: 'comments.post',
		call: function(callPath, args, refPaths, thisPaths) {
			return commentsController.post(this.db_service, args)
				.then(({ id, created_at }) => {
					return [
						{
							path: ['comments', 'byIndex'],
							invalidated: true
						},
						{
							path: ['comments', 'byId', id, 'name'],
							value: args[0]
						},
						{
							path: ['comments', 'byId', id, 'email'],
							value: args[1]
						},
						{
							path: ['comments', 'byId', id, 'comment'],
							value: args[2]
						},
						{
							path: ['comments', 'byId', id, 'created_at'],
							value: created_at
						}
					]
				})
		}
	},

	{
		route: 'comments.remove',
		call: function(callPath, args, refPaths, thisPaths) {
			return commentsController.remove(this.db_service, args)
				.then(({ length }) => {
					const response = [
						{
							path: ['comments', 'byIndex'],
							invalidated: true
						}
					]
					args.forEach(id => {
						response.push({
							path: ['comments', 'byId', id],
							invaldiated: true
						})
					})
					return response;
				})
		}
	}

]