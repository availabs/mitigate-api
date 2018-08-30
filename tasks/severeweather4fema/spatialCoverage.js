let db_service = require('../../db_service/index')
let metadata = require('../../routes/metadata')
let hazards2severeWeather = metadata.hazards2severeWeather
let severeWeather2hazards = metadata.severeWeather2hazards
let d3 =  require('d3-dsv')

let query = `SELECT 
	  event_type, 
	  SUM(CASE WHEn begin_lat is not null THEN 1 else 0 end) as has_geo,
	  SUM(CASE WHEn begin_lat is not null THEN property_damage else 0 end) as has_geo_damage,
	  sum(property_damage) as total_damage,
	  count(1) as total
	  FROM severe_weather.details
	  where year >= 1996
	  group by 1`


db_service.promise(query).then(data => {
	let output = {}
	data.forEach(row => {
		let currentHazard = severeWeather2hazards[row.event_type]
		console.log(currentHazard)
		if(currentHazard) {
			if(!output[currentHazard]) {
				output[currentHazard] = {has_geo:0, num_events:0 , has_geo_damage: 0, total_damage:0}
			}
			output[currentHazard].has_geo += +row.has_geo
			output[currentHazard].num_events += +row.total
			output[currentHazard].has_geo_damage += +row.has_geo_damage
			output[currentHazard].total_damage += +row.total_damage
		}
	})
	Object.keys(output).forEach(hazard => {
		let haz = output[hazard]
		haz.hazard = hazard
		haz.spatial_percent = ((haz.has_geo / haz.num_events) * 100) 
		haz.damage_percent = ((haz.has_geo_damage / haz.total_damage) * 100)
	})
	let flatHazards = Object.keys(output).map(d => output[d])
	console.log(d3.csvFormat(flatHazards))
})