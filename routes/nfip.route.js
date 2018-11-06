const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,

	nfipController = require("../services/nfipController"),

	{ pprint } = require("../utils/utils");

const getGeoids = pathSet => pathSet.geoids.map(geoid => geoid.toString());

module.exports = [
	{
		route: `nfip.byGeoid[{keys:geoids}].allTime['num_losses', 'num_properties', 'num_mitigated', 'total_loss', 'building_loss', 'contents_loss']`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				attributes = pathSet[4];
			return nfipController.byGeoidAllTime(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, {});
						attributes.forEach(attribute => {
							response.push({
								path: ['nfip', 'byGeoid', geoid, 'allTime', attribute],
								value: +row[attribute] || 0
							})
						})
					})
					return response;
				});
		}
	},

	{
		route: `nfip.severe.byGeoid[{keys:geoids}].allTime['num_losses', 'num_properties', 'num_mitigated', 'total_loss', 'building_loss', 'contents_loss']`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				attributes = pathSet[5];
			return nfipController.severeByGeoidAllTime(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, {});
						attributes.forEach(attribute => {
							response.push({
								path: ['nfip', 'severe', 'byGeoid', geoid, 'allTime', attribute],
								value: +row[attribute] || 0
							})
						})
					})
					return response;
				});
		}
	},

	{
		route: `nfip.losses.byGeoid[{keys:geoids}].allTime['total_losses', 'closed_losses', 'open_losses', 'cwop_losses', 'total_payments']`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				attributes = pathSet[5];
			return nfipController.lossesByGeoidAllTime(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, {})
						attributes.forEach(attribute => {
							response.push({
								path: ['nfip', 'losses', 'byGeoid', geoid, 'allTime', attribute],
								value: +row[attribute] || 0
							})
						})
					})
					return response;
				})
		}
	},

	{
		route: `nfip.policies.byGeoid[{keys:geoids}].allTime['policies', 'insurance_whole', 'written_premium']`,
		get: function(pathSet) {
			const geoids = getGeoids(pathSet),
				attributes = pathSet[5];
			return nfipController.policiesByGeoidAllTime(this.db_service, geoids)
				.then(rows => {
					const response = [];
					geoids.forEach(geoid => {
						const row = rows.reduce((a, c) => c.geoid === geoid ? c : a, {})
						attributes.forEach(attribute => {
							response.push({
								path: ['nfip', 'policies', 'byGeoid', geoid, 'allTime', attribute],
								value: +row[attribute] || 0
							})
						})
					})
					return response;
				})
		}
	}
	
]