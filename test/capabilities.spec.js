const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('content', () => {

	const content_id = `my-special-content-id`;

	test('content.byIndex.length', (done) => {
		const getEvent = {
	  		'paths': [
	  			['capabilities', 'length']
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(typeof get(response, 'jsonGraph.capabilities.length.value', null)).toBe("number");
			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});