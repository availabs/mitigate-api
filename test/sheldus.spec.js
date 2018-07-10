var falcorGraph = require('./graph');
var get = require('lodash.get');
var hazards = 

describe('Sheldus', () => {
	
	test('riskIndex hazard list', (done) => {
		var getEvent = {
	  		'paths': `[[
  				'sheldus',
  				'36',
  				['wind','wildfire','tsunami','tornado','riverine','lightning','landslide','icestorm','hurricane','heatwave','hail','earthquake','drought','avalanche','coldwave','winterweat','volcano','coastal'],
  				{'from':1996,'to':2012},
  				['num_events','property_damage', 'crop_damage', 'injuries', 'fatalities']
	  		]]`,
	  		'method': 'get'
	  	}
	  	
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.log('meta response', JSON.stringify(response))
	  		expect(get(response, 'jsonGraph.sheldus.36.wind.1996.num_events', null)).not.toBe(36582.86)
			done()
		});
	})

})

afterAll(() => {
  return falcorGraph.close();
});
