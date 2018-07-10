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

})

afterAll(() => {
  return falcorGraph.close();
});
