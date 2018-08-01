const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('content', () => {

	const content_id = `my-special-content-id`;

	test('content.byIndex.length', (done) => {
		const getEvent = {
	  		'paths': [
	  			['content', 'byIndex', 'length']
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(typeof get(response, 'jsonGraph.content.byIndex.length.value', null)).toBe("number");
			done();
		});
	})

	test('content.insert', (done) => {
		const callEvent = {
	  		'method': 'call',
	  		'callPath': ['content', 'insert'],
	  		'args': [content_id, { test: "attribute", hello: "world" }, 'Some body text here.']
	  	}
		falcorGraph.respond({ queryStringParameters: callEvent }, (error, response) => {
			expect(get(response, `jsonGraph.content.byId.${ content_id }.body.value`)).toBe("Some body text here.");
			expect(typeof get(response, 'jsonGraph.content.byIndex.length.value', null)).toBe("number");
			done();
		});
	})

	test('content.byId::get', (done) => {
		const getEvent = {
	  		'method': 'get',
	  		'paths': [
	  			[
	  				'content', 'byId',
	  				[content_id, 'fake-id'],
	  				['attributes', 'body']
	  			]
	  		]
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, `jsonGraph.content.byId.${ content_id }.body.value`)).toBe("Some body text here.");
			done();
		});
	})

	test('content.byId::set', (done) => {
		const setEvent = {
	  		'method': 'set',
	  		'jsonGraph': {
	  			'paths': [['content', 'byId', content_id, 'body']],
	  			'jsonGraph': {
		  			'content': {
		  				'byId': {
		  					[content_id]: {
		  						'body': 'New body text here!'
		  					}
		  				}
		  			}
		  		}
	  		}
	  	}
		// const jsonGraph = {
		// 	"jsonGraph":{"content":{"byId":{"test-id-3":{"body":"# HEADER TEST"}}}},"paths":[["content","byId","test-id-3","body"]]}
	 	// const setEvent = {
	 	// 	method: 'set',
	 	// 	jsonGraph
	 	// }
		falcorGraph.respond({ queryStringParameters: setEvent }, (error, response) => {
			expect(get(response, `jsonGraph.content.byId.${ content_id }.body.value`)).toBe("New body text here!");
			done();
		});
	})

	test('content.byId.remove', (done) => {
		const callEvent = {
	  		'method': 'call',
	  		'callPath': ['content', 'byId', 'remove'],
	  		'args': [content_id]
	  	}
		falcorGraph.respond({ queryStringParameters: callEvent }, (error, response) => {
			expect(typeof get(response, 'jsonGraph.content.byIndex.length.value', null)).toBe("number");
			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});