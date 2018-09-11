const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('Critical Infrastructure', () => {

	test(`critical[{keys:geoids}].length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['critical',
	  				['36', '36011', '36001'],
	  				'length'
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.critical', null);

			expect(data['36'].length).toBe(9849);
			expect(data['36011'].length).toBe(72);
			expect(data['36001'].length).toBe(206);

			done();
		});
	})

	test(`critical[{keys:geoids}].byIndex[{integers:indices}].id`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['critical',
	  				['36', '36011', '36001'],
	  				'byIndex',
	  				{ from: 0, to: 72 },
	  				'id'
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.critical', null);

			expect(data['36'].byIndex['0'].id).toBe(6364);
			expect(data['36011'].byIndex['0'].id).toBe(238);
			expect(data['36001'].byIndex['0'].id).toBe(521);

			done();
		});
	})

	test(`critical.byId[{keys:ids}][ATTRIBUTES]`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['critical', 'byId',
	  				[6364, 238, 521, -1],
	  				['ftype', 'fcode', 'geoid', 'cousub', 'address']
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.critical', null);

			expect(data.byId[6364].ftype).toBe(820);
			expect(data.byId[238].ftype).toBe(730);
			expect(data.byId[521].ftype).toBe(740);
			expect(data.byId[-1]).toBe(null);

			done();
		});
	})
})

afterAll(() => {
	return falcorGraph.close();
});