var dbservice = require('../../db_service');


var selectArea = `



/*
insert into irvs.buildings_2018_new (replace_val)

select 
 int(asset_val * total_footprint / b.st_area(wkb_geometry)) as replace_val,
  avg (st_area(footprint)) as total_footprint
  a.id, a.parcel_id, avg(st_area(footprint)) as total_footprint,  
    b.full_market_val - b.land_av as asset_val

select parcel_id  
from irvs.buildings_2018_new  
group by parcel_id
*/



SELECT a.id, a.name, a.type, a.parcel_id, st_area(footprint) as building_area,  b.full_market_val - b.land_av as asset_val
from irvs.buildings_2018_new as a
JOIN public.nys_2017_tax_parcels_1811_valid_1 as b
ON  a.parcel_id = b.objectid
where a.replace_val is null
order by parcel_id desc
limit 100

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

		console.log('inserted', inserts  )
		 

		dbservice.end();
	})



/*
insert into irvs.buildings_2018_new_1 (replace_val) values
where id = id*/



/*	
dbservice.promise(selectBF)
.then(function(rows) {
  rows.forEach(row => console.log(`{"type":"Feature", "id": "${row.objectid}", "properties":{"municipality": "${row.muni_name}"}, "geometry":${row.st_asgeojson}}`))
 })*/









/*-----------
var dbservice = require('../../db_service');

var fs        = require('fs');


var selectBF = `SELECT p2.objectid, p2.muni_name, St_asgeojson(p1.wkb_geometry)
	FROM public.buildingfootprint_ms AS p1
	INNER JOIN public."nys_2017_tax_parcels_agencies_4326_WGS_84" as p2 ON ST_Contains(geom, wkb_geometry) OR ( st_intersects(geom, wkb_geometry) and
	   (st_area(st_intersection(geom, wkb_geometry))/st_area(geom)) > .5)
	WHERE p2.muni_name = 'Albany';`

dbservice.promise(selectBF)
.then(function(rows) {
  rows.forEach(row => console.log(`{"type":"Feature", "id": "${row.objectid}", "properties":{"municipality": "${row.muni_name}"}, "geometry":${row.st_asgeojson}}`))
 })
*/

		 
/*
        Update irv.buildings_2018_new_1 as p1
set replace_val = p2.replacemen

FROM public.state_assets_4326 as p2,
            public.nys_2017_tax_parcels_1811_valid_1 as p3
WHERE ST_Contains( p3.wkb_geometry, p2.st_transform )
And p1.parcel_id = p3.objectid::character varying;*/

    /*  array of building_value



			let insertBuilding= ` update irvs.buildings_2018_new_1 as p1
			set replace_val = inserts.building_value
        where a.id = id
			`

			                    

			  insertBuilding += `(${building_value})`    



*/


	

