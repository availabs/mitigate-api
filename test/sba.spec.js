const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('SBA TESTS', () => {
// `sba.events.byId[{keys:entry_ids}]['${ ATTRIBUTES.join("', '")}']`
	test('sba.events.byId', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', 'events', 'byId', [1,2,3,4], ['total_loss', 'loan_total', 'geoid']]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			const data = get(response, 'jsonGraph.sba.events.byId', null);
			expect(data[1].loan_total).toBe(38100.0);
			expect(data[2].total_loss).toBe(3741.0);
			expect(data[3].loan_total).toBe(600.0);
			expect(data[4].total_loss).toBe(33331.0);
			done();
		});
	})

// `sba['business', 'home', 'all'][{keys:geoids}][{keys:hazardids}][{integers:years}]['total_loss', 'total_approved_loan', 'num_loans']`
	test('sba.byGeoByYear', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', ['business', 'home', 'all'],
	  				["3611526715","3611530037","3611564782","36119","3611905320","3611921820"], 
	  				['wind', 'hurricane'],
	  				[2011, 2017],
	  				['total_loss', 'loan_total']
	  			]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(+get(response, 'jsonGraph.sba.home.3611526715.hurricane.2011.total_loss', null)).toBe(8900.0);
			expect(+get(response, 'jsonGraph.sba.business.3611526715.hurricane.2011.total_loss', null)).toBe(25486.0);
			expect(+get(response, 'jsonGraph.sba.all.3611526715.hurricane.2011.total_loss', null)).toBe(8900.0+25486.0);
			done();
		});
	})

// `sba.events[{keys:geoids}][{keys:hazardids}][{integers:years}].length`
	test('sba.events...length', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', 'events',
	  				["3611526715","3611530037","3611564782","36119","3611905320","3611921820"], 
	  				['wind', 'hurricane'],
	  				[2011, 2017],
	  				'length'
	  			]
	  		],
	  		'method': 'get'
	  	}
	  	falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
	  		expect(+get(response, 'jsonGraph.sba.events.3611564782.hurricane.2011.length', null)).toBe(2)
	  		expect(+get(response, 'jsonGraph.sba.events.3611921820.hurricane.2011.length', null)).toBe(1)
	  		expect(+get(response, 'jsonGraph.sba.events.36119.hurricane.2011.length', null)).toBe(66)
	  		done();
	  	})
	})

// `sba.events[{keys:geoids}][{keys:hazardids}][{integers:years}].byIndex[{integers:indices}].entry_id`
	test('sba.events...byIndex', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', 'events',
	  				["3611526715","3611530037","3611564782","36119","3611905320","3611921820"], 
	  				['wind', 'hurricane'],
	  				[2011, 2017],
	  				'byIndex',
	  				{ from: 0, to: 20 },
	  				"entry_id"
	  			]
	  		],
	  		'method': 'get'
	  	}
	  	falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.sba.events.3611564782.hurricane.2011.byIndex.0.entry_id', null)).toBe(84744)
			expect(get(response, 'jsonGraph.sba.events.3611526715.hurricane.2011.byIndex.0.entry_id', null)).toBe(84164)
			expect(get(response, 'jsonGraph.sba.events.36119.hurricane.2011.byIndex.8.entry_id', null)).toBe(85522)
	  		done();
	  	})
	})

// `sba.events.byId[{keys:entry_ids}]['${ ATTRIBUTES.join("', '")}']`
	test('sba.events.byId', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', 'events', 'byId', [84744,84164,85522], ['total_loss', 'loan_total', 'geoid']]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			const data = get(response, 'jsonGraph.sba.events.byId', null);
			expect(data[84744].total_loss).toBe(5451.0);
			expect(data[84164].total_loss).toBe(25486.0);
			expect(data[85522].loan_total).toBe(19700.0);
			expect(data[85522].total_loss).toBe(86295.0);
			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});