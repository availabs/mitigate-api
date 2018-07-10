var falcorGraph = require('./graph');
var get = require('lodash.get');


describe('RiskIndex', () => {
	
	test('riskIndex hazard list', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex','hazards']]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			let hazards = get(response, 'jsonGraph.riskIndex.hazards.value', null)
			expect(hazards).not.toBe(null)
			expect(hazards.length).toBe(18)
			done()
		});
	})

	test('riskIndex by Geo state', (done) => {
		var getEvent = {
	  		'paths': `[['Geo','36','counties']]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			console.log(JSON.stringify(response))
			expect(get(response, 'jsonGraph.riskIndex.36.wind.score', null)).toBe(39.03)
			done()
		});
	})

	test('riskIndex by Geo state', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex','36', ['wind','wildfire', 'tsunami'],['score', 'value']]]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			console.log(JSON.stringify(response))
			expect(get(response, 'jsonGraph.riskIndex.36.wind.score', null)).toBe(39.03)
			done()
		});
	})

	test('riskIndex by Geo county multiple', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex',['36001',36003], ['wind','wildfire', 'tsunami'],['score', 'value']]]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			// console.log(JSON.stringify(response))
			
			let hazards = get(response, 'jsonGraph.riskIndex.36001.wind.score', null)
			expect(hazards).not.toBe(null)
			done()
		});
	})


	test('riskIndex by Geo tract multiple', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex',["36001014001","36001014607","36001000700"], ['wind','wildfire', 'tsunami'],['score', 'value']]]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			expect(get(response, 'jsonGraph.riskIndex.36001000700.wind.score', null)).not.toBe(null)
			done()
		});
	})

	test('riskIndex by Geo multi level', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex',['36','36001','36003',"36001014001","36001014607","36001000700"], ['wind','wildfire', 'tsunami'],['score', 'value']]]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			expect(get(response, 'jsonGraph.riskIndex.36001000700.wind.score', null)).not.toBe(null)
			expect(get(response, 'jsonGraph.riskIndex.36001.wind.score', null)).not.toBe(null)
			expect(get(response, 'jsonGraph.riskIndex.36.wind.score', null)).not.toBe(null)
			done()
		});
	})

	test('riskIndex meta', (done) => {
		var getEvent = {
	  		'paths': `[['riskIndex','meta',['wind','wildfire','tsunami', 'riverine'],['id', 'name']]]`,
	  		'method': 'get'
	  	}
	  	
		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			expect(get(response, 'jsonGraph.riskIndex.meta.riverine.name', null)).toBe('Riverine Flooding')
			done()
		});
	})

})

afterAll(() => {
  return falcorGraph.close();
});
