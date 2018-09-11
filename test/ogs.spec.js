const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('OGS Data', () => {

	test(`ogs.length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['ogs', 'byGeoid',
	  				['36', '36011', '36001'],
	  				'length'
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.ogs.byGeoid', null);

			expect(data['36'].length).toBe(14605);
			expect(data['36011'].length).toBe(256);
			expect(data['36001'].length).toBe(259);

			done();
		});
	})

	test(`ogs.byIndex`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['ogs', 'byGeoid',
	  				['36', '36011', '36001'],
	  				'byIndex',
	  				{ from: 0, to: 72 },
	  				'id'
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.ogs.byGeoid', null);

			expect(data['36'].byIndex['0'].id).toBe(14489);
			expect(data['36011'].byIndex['0'].id).toBe(15);
			expect(data['36001'].byIndex['0'].id).toBe(10);

			done();
		});
	})

	test(`ogs.byId`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['ogs', 'byId',
	  				[14489, 15, 10, -1],
	  				['geoid', 'cousub', 'agency']
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.ogs', null);

			expect(data.byId[14489].geoid).toBe("36109");
			expect(data.byId[15].geoid).toBe("36011041700");
			expect(data.byId[10].geoid).toBe("36001001100");

			expect(data.byId[14489].cousub).toBe(null);
			expect(data.byId[15].cousub).toBe("3601103078");
			expect(data.byId[10].cousub).toBe("3600101000");

			expect(data.byId[14489].agency).toBe("Off of Parks, Rec & Hstrc Pres");
			expect(data.byId[15].agency).toBe("Div Military & Naval Affairs");
			expect(data.byId[10].agency).toBe("Unified Court System");

			expect(data.byId[-1]).toBe(null);

			done();
		});
	})
})

afterAll(() => {
	return falcorGraph.close();
});