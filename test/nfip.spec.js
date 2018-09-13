const falcorGraph = require('./graph'),
	get = require('lodash.get'),

	{ pprint } = require("../utils/utils");

describe('OGS Data', () => {

	test(`ogs.length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['nfip', 'byGeoid',
	  				['36', '36011', '36001'],
	  				'allTime',
	  				['num_losses', 'total_loss', 'building_loss', 'contents_loss']
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.nfip.byGeoid', null);

			expect(data['36'].allTime.num_losses).toBe(52665);
			expect(data['36011'].allTime.num_losses).toBe(30);
			expect(data['36001'].allTime.num_losses).toBe(92);

			done();
		});
	})
})

afterAll(() => {
	return falcorGraph.close();
});