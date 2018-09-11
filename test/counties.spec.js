const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('Counties', () => {

	test(`counties.byFips`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['counties', 'byFips',
	  				['36011', '36001'],
	  				['plan_consultant', 'plan_url', 'plan_expiration']
				]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.counties.byFips', null);

			expect(data['36011'].plan_expiration).toBe("2019-04-15");
			expect(data['36001'].plan_expiration).toBe("2015-02-03");

			expect(data['36011'].plan_consultant).toBe("TetraTech");
			expect(data['36001'].plan_consultant).toBe("B & L");

			expect(data['36011'].plan_url).toBe("http://www.cayugacounty.us/Departments/Planning-and-Economic-Development/Environmental-Protection/Hazard-Mitigation");
			expect(data['36001'].plan_url).toBe("http://www.albanycounty.com/government/departments/departmentofpublicworks.aspx");

			done();
		});
	})
})

afterAll(() => {
	return falcorGraph.close();
});