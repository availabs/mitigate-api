const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('capabilities', () => {

	test('capabilities.length', (done) => {
		const getEvent = {
	  		'paths': [
	  			['capabilities', 'length']
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.log('response',response)
			//expect(typeof get(response, 'jsonGraph.capabilities.length.value', null)).toBe("number");
			done();
		});
	})

	/*
	test('capabilities.byId', (done) => {
		const getEvent = {
	  		'paths': [
	  			['capabilities', 'byId', [1, 2, 3], 'name']
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
			done();
		});
	})
	 */

})

afterAll(() => {
	return falcorGraph.close();
});