const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('SBA TESTS', () => {

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
			expect(get(response, 'jsonGraph.sba.events.3611564782.hurricane.2011.byIndex.0.entry_id', null)).toBe(50345)
			expect(get(response, 'jsonGraph.sba.events.3611526715.hurricane.2011.byIndex.0.entry_id', null)).toBe(50083)
			expect(get(response, 'jsonGraph.sba.events.36119.hurricane.2011.byIndex.8.entry_id', null)).toBe(50251)
	  		done();
	  	})
	})

// `sba.events.byId[{keys:entry_ids}]['${ ATTRIBUTES.join("', '")}']`
	test('sba.events.byId', done => {
		const getEvent = {
	  		'paths': [
	  			['sba', 'events', 'byId', [50345,50083,50251], ['total_loss', 'loan_total', 'geoid']]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			const data = get(response, 'jsonGraph.sba.events.byId', null);
			expect(data[50083].total_loss).toBe(8900.0);
			expect(data[50083].loan_total).toBe(7900.0);
			expect(data[50251].loan_total).toBe(11100.0);
			expect(data[50345].total_loss).toBe(275072.0);
			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});