var falcorGraph = require('./graph');
var get = require('lodash.get');
var hazards = 

describe('Geography tools', () => {
	
	test('geoid info', (done) => {
		var getEvent = {
	  		'paths': `[[
  				'geo',
  				['36','36001','3601755959', '36093033102'],
  				['geoid','name', 'type']
	  		]]`,
	  		'method': 'get'
	  	}
	  	
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		expect(get(response, 'jsonGraph.geo.3601755959.name', null)).toBe("Oxford town")
			done()
		});
	})

	test('nys counties', (done) => {
		var getEvent = {
	  		'paths': `[['geo','36','counties']]`,
	  		'method': 'get'
	  	}
	  	
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		expect(get(response, 'jsonGraph.geo.36.counties.value', null)).not.toBe(null)
	  		// ny should have 62 counties
	  		expect(get(response, 'jsonGraph.geo.36.counties.value', null).length).toBe(62)
			done()
		});
	})

	test('nys tracts', (done) => {
		var getEvent = {
	  		'paths': `[['geo',['36','36001'],'tracts']]`,
	  		'method': 'get'
	  	}
	  	
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		
	  		// console.log('meta response', JSON.stringify(response))
	  		expect(get(response, 'jsonGraph.geo.36.tracts.value', null)).not.toBe(null)
	  		
	  		// ny should have 4918 tracts
	  		expect(get(response, 'jsonGraph.geo.36.tracts.value', null).length).toBe(4918)
	  		
	  		// albany county should have 75 tracts
	  		expect(get(response, 'jsonGraph.geo.36001.tracts.value', null).length).toBe(75)
			
			done()
		});
	})

	test('CensusAcsByGeoidByYear', done => {
		const getEvent = {
			paths: `[
				['geo', ['36', '36001', '3600106354', '36001013505'], [2018, 2017, 2016, 2015, 2014], ['population', 'under_5']]
			]`,
			method: 'get'
		}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.geo.36.2018.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2017.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2016.population', null)).toBe(19697457);
			expect(get(response, 'jsonGraph.geo.36.2015.population', null)).toBe(19673174);
			expect(get(response, 'jsonGraph.geo.36.2014.population', null)).toBe(19594330);

			expect(get(response, 'jsonGraph.geo.36001.2018.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2017.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2016.population', null)).toBe(307891);
			expect(get(response, 'jsonGraph.geo.36001.2015.population', null)).toBe(307463);
			expect(get(response, 'jsonGraph.geo.36001.2014.population', null)).toBe(306124);

			expect(get(response, 'jsonGraph.geo.36.2018.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2017.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2016.under_5', null)).toBe(598437 + 572286);
			expect(get(response, 'jsonGraph.geo.36.2015.under_5', null)).toBe(601900 + 574532);
			expect(get(response, 'jsonGraph.geo.36.2014.under_5', null)).toBe(597992 + 572266);

			expect(get(response, 'jsonGraph.geo.36001.2018.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2017.under_5', null)).toBe(0);
			expect(typeof get(response, 'jsonGraph.geo.36001.2016.under_5', null)).toBe('number');
			expect(typeof get(response, 'jsonGraph.geo.36001.2015.under_5', null)).toBe('number');
			expect(typeof get(response, 'jsonGraph.geo.36001.2014.under_5', null)).toBe('number');

			done();
		})
	})

})

afterAll(() => {
  return falcorGraph.close();
});
