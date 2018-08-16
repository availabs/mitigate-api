const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('hmap Tests', () => {

// `hmap.events[{keys:geoids}][{keys:hazardids}][{integers:years}].length`
	test('hmapLengths', (done) => {
		const getEvent = {
	  		'paths': [
	  			[
	  				'hmap',
	  				['36'],
	  				['hurricane'],
	  				[2011, 2012, 2013],
	  				'length'
	  			]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2011.length', false)).toBe(9);
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2012.length', false)).toBe(8);
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2013.length', false)).toBe(73);
			
			done();
		});
	})

// 'hmap[{keys:geoids}][{keys:hazardids}][{integers:years}].byIndex[{integers:indices}].project_id'
	test('hmapIndices', (done) => {
		const getEvent = {
	  		'paths': [
	  			[
	  				'hmap',
	  				['36'],
	  				['hurricane'],
	  				[2011, 2012, 2013],
	  				'byIndex',
	  				[0, 1, 2, 3, 4, 5, 6, 7, 8],
	  				'project_id'
	  			]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2011.byIndex.0.project_id')).toBe("DR-1869-0007-P");
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2012.byIndex.0.project_id')).toBe("DR-4020-0004-P");
			expect(get(response, 'jsonGraph.hmap.36.hurricane.2013.byIndex.0.project_id')).toBe("DR-1650-0021-R");
			
			done();
		});
	})

	test('hmapById', (done) => {
		const getEvent = {
	  		'paths': [
	  			[
	  				'hmap', 'byId',
	  				["DR-1869-0007-P", "DR-4020-0004-P", "DR-1650-0021-R"],
	  				[
	  					"project_id",
  						"hazardid",
				  		"year",
				  		"disasternumber",
				  		"region",
				  		"geoid",
				  		"projecttype",
				  		"projecttitle"
				  	]
	  			]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.hmap.byId.DR-1869-0007-P.hazardid', false)).toBe('hurricane');
			expect(get(response, 'jsonGraph.hmap.byId.DR-4020-0004-P.hazardid', false)).toBe('hurricane');
			expect(get(response, 'jsonGraph.hmap.byId.DR-1650-0021-R.hazardid', false)).toBe('hurricane');

			expect(get(response, 'jsonGraph.hmap.byId.DR-1869-0007-P.year', false)).toBe(2011);
			expect(get(response, 'jsonGraph.hmap.byId.DR-4020-0004-P.year', false)).toBe(2012);
			expect(get(response, 'jsonGraph.hmap.byId.DR-1650-0021-R.year', false)).toBe(2013);

			expect(get(response, 'jsonGraph.hmap.byId.DR-1869-0007-P.geoid', false)).toBe('36119');
			expect(get(response, 'jsonGraph.hmap.byId.DR-4020-0004-P.geoid', false)).toBe('36051');
			expect(get(response, 'jsonGraph.hmap.byId.DR-1650-0021-R.geoid', false)).toBe('36007');

			done();
		});
	})

	test('hmapYearsOfData', (done) => {
		const getEvent = {
	  		'paths': [
	  			[
	  				'hmap', 'yearsOfData'
	  			]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.hmap.yearsOfData.value', false).length).toBe(29);

			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});