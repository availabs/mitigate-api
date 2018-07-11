const falcorGraph = require('./graph'),
	get = require('lodash.get');

describe('SevereWeather', () => {
/*
`severeweather
	[{keys:geoids}]
	[{keys:hazardids}]
	[{keys:years}]
	['num_events',
		'property_damage',
		'crop_damage',
		'injuries',
		'fatalities']`
*/
	test('SevereWeatherByGeoByYear', (done) => {
		var getEvent = {
	  		'paths': `[
	  			['severeweather',
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
			let data = get(response, 'jsonGraph.severeweather.36.wind.2017', null);
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
	  			['severeweather',
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
			let data = get(response, 'jsonGraph.severeweather.36.wind.2017', null);
			expect(data.num_events).toBe(1187);
			expect(data.injuries).toBe(17);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(17861950);
			expect(data.crop_damage).toBe(42000);

			data = get(response, 'jsonGraph.severeweather.36001.wind.2017', null);
			expect(data.num_events).toBe(41);
			expect(data.injuries).toBe(3);
			expect(data.fatalities).toBe(0);
			expect(data.property_damage).toBe(660000);
			expect(data.crop_damage).toBe(0);
			
			data = get(response, 'jsonGraph.severeweather.36001.wind.2016', null);
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
	  			['severeweather',
	  				['36', '36001'],
		  			['wind', 'winterweat'],
		  			[2016, 2017],
		  			['num_events',
						'property_damage',
						'crop_damage'
					]
				]
	  		]`,
	  		'method': 'get'
	  	}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			let data = get(response, 'jsonGraph.severeweather.36.winterweat.2017', null);
			expect(data.num_events).toBe(480);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(3772000);
			expect(data.crop_damage).toBe(0);

			data = get(response, 'jsonGraph.severeweather.36001.winterweat.2017', null);
			expect(data.num_events).toBe(1);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(75000);
			expect(data.crop_damage).toBe(0);
			
			data = get(response, 'jsonGraph.severeweather.36001.winterweat.2016', null);
			expect(data.num_events).toBe(5);
			expect(data.injuries).toBe(undefined);
			expect(data.fatalities).toBe(undefined);
			expect(data.property_damage).toBe(54000);
			expect(data.crop_damage).toBe(0);

			done();
		});
	})
})

afterAll(() => {
	return falcorGraph.close();
});