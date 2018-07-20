const falcorGraph = require('./graph'),
	get = require('lodash.get');

var counties = [36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36089,36091,36093,36095,36097,36099,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123] 

describe('SevereWeather', () => {

	test('SevereWeatherByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeWeather',
	  				['36'],
		  			['wind'],
		  			[2017],
		  			['num_events',
						'property_damage',
						'crop_damage',
						'injuries',
						'fatalities'
					]
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.severeWeather.36.wind.2017', null);
			expect(data.num_events).toBe(1187);
			expect(data.injuries).toBe(17);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(17861950);
			expect(data.crop_damage).toBe(42000);

			done();
		});
	})

	test('SevereWeatherByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeWeather',
	  				['36', '36001'],
		  			['wind', 'winterweat'],
		  			[2016, 2017],
		  			['num_events',
						'property_damage',
						'crop_damage',
						'injuries',
						'fatalities'
					]
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.severeWeather.36.wind.2017', null);
			expect(data.num_events).toBe(1187);
			expect(data.injuries).toBe(17);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(17861950);
			expect(data.crop_damage).toBe(42000);

			data = get(response, 'jsonGraph.severeWeather.36001.wind.2017', null);
			expect(data.num_events).toBe(41);
			expect(data.injuries).toBe(3);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(660000);
			expect(data.crop_damage).toBe(0);
			
			data = get(response, 'jsonGraph.severeWeather.36001.wind.2016', null);
			expect(data.num_events).toBe(6);
			expect(data.injuries).toBe(0);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(15000);
			expect(data.crop_damage).toBe(0);

			done();
		});
	})
	
	test('SevereWeatherByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeWeather',
	  				[36,${counties}],
		  			['coastal','wind', 'winterweat'],
		  			{'from':1996,'to':2017},
		  			[
		  				'num_events',
					 	'property_damage',
						'crop_damage'
					]
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.severeWeather.36.winterweat.2017', null);
			expect(data.num_events).toBe(480);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(3772000);
			expect(data.crop_damage).toBe(0);

			data = get(response, 'jsonGraph.severeWeather.36001.winterweat.2017', null);
			expect(data.num_events).toBe(1);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(75000);
			expect(data.crop_damage).toBe(0);
			
			data = get(response, 'jsonGraph.severeWeather.36001.winterweat.2016', null);
			expect(data.num_events).toBe(5);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(54000);
			expect(data.crop_damage).toBe(0);

			done();
		});
	})

	test('SevereWeatherEventsLengthByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeWeather','events',
	  				['36'],
		  			['coastal', 'wind', 'winterweat'],
		  			[2016, 2017],
		  			'length'
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {

			done();
		});
	})

	test('SevereWeatherEventsByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeWeather','events',
	  				['36'],
		  			['riverine', 'coastal', 'wind', 'winterweat'],
		  			[2016, 2017],
		  			['property_damage','magnitude']
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.severeWeather.events.36', null);

			done();
		});
	})

})

afterAll(() => {
	return falcorGraph.close();
});