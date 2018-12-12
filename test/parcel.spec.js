const falcorGraph = require('./graph'),
	get = require('lodash.get');

jest.setTimeout(10000)

describe('Parcel', () => {

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
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
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
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.parcel', null);

			expect(+data.byGeoid['36001'].byIndex[0].id).toBe(97247)
			expect(+data.byGeoid['36011'].byIndex[0].id).toBe(391252)

			done();
		});
	})

	test(`parcel.byId[{keys:parcelids}][ATTRIBUTES]`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['parcel', 'byId',
	  				[97247, 391252, -1],
						["prop_class", "roll_secti", "land_av", "total_av", "full_marke"]
					]
	  		],
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.parcel', null);

			expect(data.byId[97247].prop_class).toBe("240");
			expect(data.byId[391252].prop_class).toBe("270");
			expect(data.byId[-1]).toBe(null);

			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});