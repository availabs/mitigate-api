var dbservice = require('../../db_service');


var selectArea = `

SELECT a.id, a.name, a.type, a.parcel_id, st_area(footprint) as building_area,  b.full_market_val - b.land_av as asset_val
From irvs.buildings_2018_new as a
JOIN public.nys_2017_tax_parcels_1811_valid_1 as b
  ON  a.parcel_id = b.objectid
   where a.replace_val is null
   order by parcel_id desc
 --limit 100

`
	dbservice.promise(selectArea).then(data=> {
		let  totalBuildingArea = data.reduce( (out, current) => {
			if(!out[current.parcel_id]){
				out[current.parcel_id] = 0
			}
			out[current.parcel_id] += +current.building_area
			return out
		},{})

		let inserts = data.map(d => {
			d.building_value = Math.round(d.asset_val * (d.building_area /  totalBuildingArea[d.parcel_id]))
			d.building_pct = (d.building_area /  totalBuildingArea[d.parcel_id])
			return d
		})

		/*console.log(inserts)*/
		
		let interval = 10000
		for(let insertCount = 0; insertCount < inserts.length; insertCount += interval){
			var insertSql = `Insert into irvs.enhanced_building_risk (building_id, replacement_value) VALUES `
			let inservalues = inserts
				.filter((d,index) => index >= insertCount && index < insertCount + interval )
				.map(d => `(${d.id}, ${d.building_value})`)

			insertSql += inservalues.join(',')

			//console.log(insertSql)

			dbservice.promise(insertSql).then(d => console.log(`inserted ${insertCount}`))
		}
	/*	 dbservice.end();*/
	})


