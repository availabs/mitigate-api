const falcorGraph = require('./graph'),
	get = require('lodash.get');

jest.setTimeout(10000)

describe('Parcel', () => {
	/*
	test(`parcel.byGeoid[{keys:geoids}].length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['parcel', 'byGeoid',
	  				['36', '36011', '36001'],
	  				'length'
				]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byGeoid')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byGeoid')
			let data = get(response, 'jsonGraph.parcel', null);

			expect(+data.byGeoid['36'].length).toBe(4734020)
			expect(+data.byGeoid['36001'].length).toBe(110192)
			expect(+data.byGeoid['36011'].length).toBe(37772)

			done();
		});
	})

	test(`parcel.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['parcel', 'byGeoid',
	  				['36011', '36001'],
	  				'byIndex',
	  				{ from: 0, to: 5 },
	  				'id'
					]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byGeoidByIndex')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byGeoidByIndex')
			let data = get(response, 'jsonGraph.parcel', null);

			expect(+data.byGeoid['36001'].byIndex[0].id).toBe(101838)
			expect(+data.byGeoid['36011'].byIndex[0].id).toBe(391252)

			done();
		});
	})


	test(`parcel.byId`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['parcel', 'byId', [2298507], ["parcel_addr","muni_name","loc_zip"]]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.log('response',response)
			done()
		});
	})
	 */

	test(`parcel.meta`, (done) =>{
		var getEvent = {
			'paths' : [
				['parcel','meta',['owner_type','heat_type']]
			],
			'method':'get'
		}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.log('response',JSON.stringify(response))
			done()
		});
	})


})

afterAll(() => {
	return falcorGraph.close();
});