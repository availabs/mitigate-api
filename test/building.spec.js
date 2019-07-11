const falcorGraph = require('./graph'),
	get = require('lodash.get');

jest.setTimeout(10000)

describe('building', () => {

	test(`building.byGeoid[{keys:geoids}].length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byGeoid',
	  				['36011', '36001'],
	  				'length'
				]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byGeoid')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byGeoid')
			let data = get(response, 'jsonGraph.building', null);


			//console.log('36001', data.byGeoid['36001'].length)
			//console.log('36011', data.byGeoid['36011'].length)

			
			expect(+data.byGeoid['36001'].length).toBe(112176)
			expect(+data.byGeoid['36011'].length).toBe(43847)

			done();
		});
	})

	test(`building.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byGeoid',
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
			let data = get(response, 'jsonGraph.building', null);


			
			//console.log('36001', data.byGeoid['36001'].byIndex[0].id)
			//console.log('36011', data.byGeoid['36011'].byIndex[0].id)
			// console.log(
			// 	'test123',
			// 	Object.values(data.byGeoid['36001'].byIndex)
			// 	.map(d => d.id))

/*
			expect(
				Object.values(data.byGeoid['36001'].byIndex)
				.map(d => d.id))
				.toContain(4033935)*/

			expect(
				Object.values(data.byGeoid['36011'].byIndex)
				.map(d => d.id))
				.toContain(1383375)
			//expect(+data.byGeoid['36011'].byIndex[0].id).toBe(1383375)

			done();
		});
	})

	test(`building.byId[{keys:id}][ATTRIBUTES]`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byId',
	  				[246756, 4165651, 539393, 3 ],
						["geoid", "cousub_geoid", "replacement_value", "critical"]
					]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byIdSmall')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byIdSmall')
			let data = get(response, 'jsonGraph.building', null);



			//console.log('246756 replacement_value', data.byId['246756'].replacement_value)
			//console.log('4165651', data.byId['4165651'].geoid)
			//console.log('539393', data.byId['539393'].cousub_geoid)
			//console.log('3 critical', data.byId['3'].critical)


			expect(data.byId[246756].replacement_value).toBe("121000");
			expect(data.byId[4165651].geoid).toBe("36005003800");
			expect(data.byId[539393].cousub_geoid).toBe("3610116738");
			expect(data.byId[3].critical).toBe("73004");

			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});